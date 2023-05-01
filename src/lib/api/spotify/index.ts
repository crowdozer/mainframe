import { createTRPCRouter, AuthedRateLimitedProcedure } from '$server/trpc';
import { getCurrentPlaying } from '$server/spotify';
// import { z } from 'zod';

const router = createTRPCRouter({
	/**
	 * returns whatever is in the cache at url.key
	 */
	getMyStatus: AuthedRateLimitedProcedure.query(async (request) => {
		const userID = request.ctx.event.locals.user.id;

		const currentlyPlaying = await getCurrentPlaying(userID);

		return currentlyPlaying;
	}),
});

export type Router = typeof router;
export default router;
