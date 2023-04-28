import { setCredentials } from '$server/spotify';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * You can go here to reset your Spotify Auth and restart the Auth flow
 *
 *   `GET /spotify/auth/reset `
 *
 */

export const load = async function ({ locals }) {
	if (!locals.user.id) {
		throw redirect(307, '/');
	}

	void (await setCredentials(locals.user.id, null, null));

	throw redirect(307, '/spotify/auth');
} satisfies PageServerLoad;
