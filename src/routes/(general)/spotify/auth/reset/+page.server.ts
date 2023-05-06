import { setCredentials } from '$server/spotify';
import type { PageServerLoad } from './$types';

/**
 * You can go here to reset your Spotify Auth and restart the Auth flow
 *
 *   `GET /spotify/auth/reset `
 *
 */

export const load = async function ({ locals }) {
	if (!locals.user.id) {
		return {
			error: 'You must log in first',
			resume: false,
		};
	}

	void (await setCredentials(locals.user.id, null, null));

	return {
		resume: '/spotify/auth',
	};
} satisfies PageServerLoad;
