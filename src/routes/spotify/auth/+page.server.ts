import { getAuthState, getAuthURI, setAuthState, tradeAuthCodeForToken } from '$server/spotify';
import { getCode } from '$server/spotify/utils';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

type Data = {
	reload?: boolean;
	error?: string;
	auth?: string;
};

/**
 * Authorizes a user with Spotify
 *
 * 1. First check if the user is logged in
 * 		If they aren't, don't do anything, they shouldn't be here anyway
 *
 * 2. Load their credentials
 * 3. If an access and refresh token exists
 * 		...
 * 4. If not, check if auth exists
 * 		If it does, trade it for an auth token
 * 			If it fails, error state
 * 			If it succeeeds, reload
 * 5. If not, check if auth is trying to persist from the URL
 * 6. If not, get an auth redirect URL and display it
 * 7. If an error occurs at any point, break out and display it
 */
export const load = async function ({ locals, url }): Promise<Data> {
	try {
		const userID = locals.user.id;

		// Step 1
		if (!userID) {
			console.log('1. Not logged in');
			return {};
		}

		// Step 2
		const credentials = await getAuthState(userID);

		// Step 3
		if (credentials.access && credentials.refresh) {
			console.log('3. Access token found', credentials.access, credentials.refresh);

			throw redirect(307, '/');
		}

		// Step 4
		if (credentials.auth) {
			console.log('4. No access token found, but credentials found');
			const result = await tradeAuthCodeForToken(userID, credentials.auth);
			return {
				reload: result.reload,
			};
		}

		// Step 5
		const urlCode = getCode(url.searchParams);
		if (urlCode) {
			console.log('5. Auth detected in URL, persisting');
			await setAuthState(userID, urlCode.code, urlCode.state);

			// If it does, auth succeeded, reload so we can start the next step
			return {
				reload: true,
			};
		}

		// Step 6.
		const uri = await getAuthURI();
		return {
			auth: uri,
		};
	} catch (error: any) {
		// (re-throw redirects)
		if (error.status >= 300 && error.status <= 400) {
			throw error;
		}

		// Step 7.
		console.error(error);
		return {
			error: error.message || 'An unknown error has occurred',
			reload: false,
		};
	}
} satisfies PageServerLoad;
