import { dev } from '$app/environment';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { prisma } from '$server/prisma';
import { cache } from '$server/cache';
import { updateOrCreateUser } from '$server/prisma/utils';
import SpotifyWebAPI from 'spotify-web-api-node';
import { TRPCError } from '@trpc/server';
import qs from 'qs';
import type {
	SpotifyAccessToken,
	SpotifyAuthCode,
	SpotifyRefreshToken,
	SpotifyCredentials,
	AuthCodeTradeResponse,
	CurrentlyPlaying,
	CachedCurrentlyPlaying,
} from './types';
import { generateRandomString, getErrorDescription } from './utils';

const redirect_uri = `${dev ? 'http://localhost:5173' : 'https://crwdzr.io'}/spotify/auth`;
const cache_expiration = 3; // 3 seconds

/**
 * A memory cache of the various web API clients that may be instantiated for each user
 */
const clients: { [key: string]: SpotifyWebAPI } = {};

/**
 * Gets the current userID's web client
 */
function getClient(userID: string): SpotifyWebAPI {
	if (!clients[userID]) {
		clients[userID] = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			redirectUri: redirect_uri,
		});
	}

	return clients[userID];
}

/**
 * Generate a sign-in link for spotify
 */
export function getAuthURI(): string {
	const state = generateRandomString(16);
	const scope = 'user-read-private user-read-playback-state';

	const uri =
		'https://accounts.spotify.com/authorize?' +
		qs.stringify({
			response_type: 'code',
			client_id: SPOTIFY_CLIENT_ID,
			scope: scope,
			redirect_uri: redirect_uri,
			state: state,
		});

	return uri;
}

/**
 * Load the user's auth state from db. Allow it to fail bc they
 * may not have an account yet.
 */
export async function getAuthState(userID: string): Promise<SpotifyCredentials> {
	const user = await prisma.user.findFirst({
		where: {
			id: userID,
		},
	});

	if (!user) {
		return {
			access: null,
			refresh: null,
			auth: null,
		};
	}

	let auth = null;
	if (user.spotifyAuthCode && user.spotifyAuthState) {
		auth = {
			code: user.spotifyAuthCode,
			state: user.spotifyAuthState,
		};
	}

	return {
		access: user.spotifyAccessToken,
		refresh: user.spotifyRefreshToken,
		auth,
	};
}

/**
 * Push the user's auth code/state to db. Use updateOrCreate bc
 * they may not be registered yet.
 */
export async function setAuthState(
	userID: string,
	code: string | null,
	state: string | null,
): Promise<void> {
	void (await updateOrCreateUser(userID, {
		spotifyAuthCode: code,
		spotifyAuthState: state,
	}));
}

/**
 * Push the user's access token to db.
 * We don't have to use updateOrCreate bc it should have already happened.
 */
export async function setCredentials(
	userID: string,
	accessToken: SpotifyAccessToken,
	refreshToken: SpotifyRefreshToken,
): Promise<void> {
	void (await prisma.user.update({
		where: {
			id: userID,
		},
		data: {
			spotifyAuthCode: null,
			spotifyAuthState: null,
			spotifyAccessToken: accessToken,
			spotifyRefreshToken: refreshToken,
		},
	}));
}

/**
 * Trades the user's auth state for an access token/refresh token
 */
export async function tradeAuthCodeForToken(
	userID: string,
	auth: SpotifyAuthCode,
): Promise<AuthCodeTradeResponse> {
	try {
		const { code, state } = auth;

		if (state === null) {
			throw new Error('state mismatch');
		}

		const client = getClient(userID);
		const res = await client.authorizationCodeGrant(code);

		const {
			body: { access_token, refresh_token },
		} = res;

		void (await setCredentials(userID, access_token, refresh_token));

		return {
			success: true,
			reload: true,
		};
	} catch (error: any) {
		console.log('================================================');
		console.log('An error occurred while interfacing with Spotify');
		console.error({ ...error });

		const description = getErrorDescription(error);

		const wipeIf = ['Authorization code expired', 'Invalid authorization code'];
		if (wipeIf.includes(description)) {
			console.log("Resetting %s's auth state due to error %s", userID, description);
			void (await setAuthState(userID, null, null));
		}

		// indicate the client should restart the login flow
		return {
			success: false,
			reload: true,
		};
	}
}

export async function updateAccessToken(userID: string, access: SpotifyAccessToken): Promise<void> {
	void (await prisma.user.update({
		where: {
			id: userID,
		},
		data: {
			spotifyAccessToken: access,
		},
	}));
}

export async function refreshAccessToken(
	userID: string,
	access: string,
	refresh: string,
): Promise<void> {
	const client = getClient(userID);
	client.setAccessToken(access);
	client.setRefreshToken(refresh);
	const result = await client.refreshAccessToken();

	void (await updateAccessToken(userID, result.body.access_token));
}

export async function getCachedCurrentlyPlaying(
	userID: string,
): Promise<CachedCurrentlyPlaying | null> {
	const key = `spotify:${userID}`;

	const value = await cache.get(key);
	if (!value) return null;

	try {
		const values = JSON.parse(value) as CachedCurrentlyPlaying;
		values.on = new Date(values.on);
		return values;
	} catch (error) {
		return null;
	}
}

export async function setCachedCurrentlyPlaying(
	userID: string,
	data: CurrentlyPlaying,
): Promise<CachedCurrentlyPlaying> {
	const key = `spotify:${userID}`;
	const value = {
		// to infer how much time has passed
		on: new Date(),
		// to avoid leaking data to the client like device
		data: {
			currently_playing_type: data.currently_playing_type,
			is_playing: data.is_playing,
			item: data.item,
			progress_ms: data.progress_ms,
		},
	} satisfies CachedCurrentlyPlaying;

	void (await cache.set(key, JSON.stringify(value)));
	void (await cache.expire(key, cache_expiration));

	return value;
}

export async function getCurrentPlaying(userID: string, retry = true): Promise<any> {
	const cached = await getCachedCurrentlyPlaying(userID);
	if (cached) return cached;

	const auth = await getAuthState(userID);

	if (!auth.access || !auth.refresh) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: 'user is not connected to spotify',
		});
	}

	try {
		const client = getClient(userID);
		client.setAccessToken(auth.access);
		const response = await client.getMyCurrentPlaybackState();
		const result = await setCachedCurrentlyPlaying(userID, response.body);
		return result;
	} catch (error: any) {
		if (!retry) {
			throw error;
		}

		const msg = error?.body?.error?.message || '';
		if (msg === 'The access token expired') {
			void (await refreshAccessToken(userID, auth.access, auth.refresh));

			return getCurrentPlaying(userID, false);
		}

		throw error;
	}
}
