import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async function (): Promise<never> {
	throw redirect(301, '/');
} satisfies PageServerLoad;
