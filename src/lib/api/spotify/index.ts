import {
	createTRPCRouter,
	guardedProcedure,
	ratelimitedRequest,
	authedRequest,
} from '$server/trpc';
import { z } from 'zod';
import type { SpotifyAuthCode } from '$server/spotify/types';
import { getAuthState, setAuthState } from '$server/spotify';

const router = createTRPCRouter({
	getAuthState: guardedProcedure(authedRequest, ratelimitedRequest).query(
		async ({ ctx }): Promise<SpotifyAuthCode | null> => {
			return getAuthState(ctx.event.locals.user.id);
		},
	),
	setAuthState: guardedProcedure(authedRequest, ratelimitedRequest)
		.input(
			z.object({
				state: z.string(),
				code: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }): Promise<void> => {
			return setAuthState(ctx.event.locals.user.id, input.code, input.state);
		}),
});

export type Router = typeof router;
export default router;
