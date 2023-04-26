import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import type { RequestEvent } from '@sveltejs/kit';
import type { Enforcer } from './guard/types';
import { authedRequest, ratelimitedRequest } from './guard';

/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

export async function createContext(event: RequestEvent) {
	return {
		event,
	};
}

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

export const t = initTRPC.context<typeof createContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/** @see https://trpc.io/docs/router */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */

export const procedure = t.procedure;

/**
 * Protected procedure
 *
 * Runs an array of gaurds against the request, one at a time, in order
 * Request is aborted as soon as one throws
 */
export const guardedProcedure = (...guards: Enforcer[]) => {
	const middleware = t.middleware(async ({ ctx, next }) => {
		for (const guard of guards) {
			await guard(ctx.event);
		}

		return next({ ctx });
	});

	return t.procedure.use(middleware);
};

export { type Enforcer, authedRequest, ratelimitedRequest };
