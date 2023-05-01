import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async function () {
	throw redirect(307, '/spotify/me');
} satisfies PageServerLoad;
