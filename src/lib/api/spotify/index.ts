import { createTRPCRouter, AuthedRateLimitedProcedure, RateLimitedProcedure } from '$server/trpc';
import { getCurrentPlaying } from '$server/spotify';

const router = createTRPCRouter({
	/**
	 * returns whatever the logged in user is playing
	 */
	getMyStatus: AuthedRateLimitedProcedure.query(async (request) => {
		const userID = request.ctx.event.locals.user.id;

		const currentlyPlaying = await getCurrentPlaying(userID);

		return currentlyPlaying;
	}),
	/**
	 * returns my spotify status
	 */
	getOwnersStatus: RateLimitedProcedure.query(async () => {
		// It's fine to hardcode this here, it's always going to be mine
		const userID = 'user_2Ov8DOL5rDbLToEnkCdzpbMbkOb';

		const currentlyPlaying = await getCurrentPlaying(userID);

		return currentlyPlaying;
	}),
});

export type Router = typeof router;
export default router;
