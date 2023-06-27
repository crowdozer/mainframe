import type { PageServerLoad } from './$types';
import { generateFeed } from '$server/feed/generate';
import type { Feed } from '$web/components/Feed/types';

/**
 * Setup ISR for the page
 * @see https://kit.svelte.dev/docs/adapter-vercel#incremental-static-regeneration
 */
export const config = {
	isr: {
		expiration: 60 * 60, // 1 hour
	},
};

/**
 * Loads necessary page data
 */
export const load = async function ({ fetch }) {
	const feed = await generateFeed(fetch);

	return {
		...feed,
		ISR: new Date(),
	} as Feed;
} satisfies PageServerLoad;
