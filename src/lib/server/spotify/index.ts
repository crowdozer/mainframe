import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { dev } from '$app/environment';
import qs from 'qs';
import { generateRandomString, getErrorDescription } from './utils';
import { prisma } from '$server/prisma';
import type {
	SpotifyAccessToken,
	SpotifyAuthCode,
	SpotifyRefreshToken,
	SpotifyCredentials,
	AuthCodeTradeResponse,
} from './types';
import SpotifyWebAPI from 'spotify-web-api-node';

const redirect_uri = `${dev ? 'http://localhost:5173' : 'https://crwdzr.io'}/spotify/auth`;

const spotifyApi = new SpotifyWebAPI({
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
	redirectUri: redirect_uri,
});

/**
 * Generate a sign-in link for spotify
 */
export function getAuthURI(): string {
	const state = generateRandomString(16);
	const scope = 'user-read-private';

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
 * Load the user's auth state from db
 */
export async function getAuthState(userID: string): Promise<SpotifyCredentials> {
	const user = await prisma.user.findFirstOrThrow({
		where: {
			id: userID,
		},
	});

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
 * Push the user's auth code/state to db
 */
export async function setAuthState(
	userID: string,
	code: string | null,
	state: string | null,
): Promise<void> {
	void (await prisma.user.update({
		where: {
			id: userID,
		},
		data: {
			spotifyAuthCode: code,
			spotifyAuthState: state,
		},
	}));
}

/**
 * Push the user's access token to db
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

		const res = await spotifyApi.authorizationCodeGrant(code);

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

export async function getCurrentPlaying(userID: string): Promise<any> {}
