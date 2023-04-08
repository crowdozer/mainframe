import type { PageLoad } from './$types';
import { generateFeed } from '$lib/views/feed/feed';

/**
 * Setup ISR for the page
 * @see https://kit.svelte.dev/docs/adapter-vercel#incremental-static-regeneration
 */
export const config = {
	isr: {
		// Expiration time (in seconds) before the cached asset will be re-generated by invoking the Serverless Function.
		// Setting the value to `false` means it will never expire.
		expiration: 60
	}
};

/**
 * Loads necessary page data
 */
export const load = async function ({ fetch }) {
	return generateFeed(fetch);
} satisfies PageLoad;
