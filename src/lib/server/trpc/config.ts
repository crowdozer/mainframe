/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing
 * a request, like the database, the session, etc.
 */

import type { RequestEvent } from '@sveltejs/kit';
import { prisma } from '$server/prisma';
import type { ResolvedType } from '~/types';

export async function createContext(event: RequestEvent) {
	return {
		event,
		prisma,
	};
}

/**
 * Request context, inferred from createContext()
 *
 * This is a utility type. If your guard modifies
 * request context, you probably need to use this.
 */
export type InferredRequestContext = ResolvedType<ReturnType<typeof createContext>>;

/**
 * Generic type for tRPC Enforcers
 *
 * You can import this type to help build your Guards,
 * but it isn't very useful if if they do not modify the request context.
 */
export type ServerTRPCEnforcer<T extends InferredRequestContext = InferredRequestContext> = (
	state: T,
) => Promise<T>;

/**
 * Utility type. Merges `Custom` into `request`.
 * You can use this to help set up your Guards.
 */
export type With<Custom> = Custom & InferredRequestContext;

/**
 * Utility type. Merges `Custom` into `request.event`
 * You can use this to help set up your Guards.
 */
export type WithEvent<Custom> = With<{
	event: Custom & InferredRequestContext['event'];
}>;

/**
 * Utility type. Merges `Custom` into `request.event.locals`
 * You can use this to help set up your Guards.
 */
export type WithLocals<Custom> = WithEvent<{
	locals: Custom & InferredRequestContext['event']['locals'];
}>;

/**
 * 2. tRPC API
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */

import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';

export const t = initTRPC.context<typeof createContext>().create({
	/**
	 * Data transformer. This needs to be the same as the one used on the client
	 */
	transformer: superjson,
	/**
	 * Error handler. If you need to inject custom behavior (logging etc) you
	 * can do it here.
	 */
	errorFormatter({ shape, error }) {
		console.log('❗ a tRPC error has occurred');
		console.error(error);

		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

/** @see https://trpc.io/docs/router */
export const createTRPCRouter = t.router;

/**
 * 3. tRPC Procedures
 *
 * This is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end.
 */

// base piece you use to build new queries and mutations on your tRPC API
export const procedure = t.procedure;

/**
 * Utility type - you may find this useful when building Guards.
 */
export type Guard<T extends InferredRequestContext> = (state: T) => Promise<T>;

/**
 * Protected procedure
 *
 * Runs an array of gaurds against the request, one at a time, in order
 * Request is aborted as soon as one throws
 */
export function guardedProcedure<T extends InferredRequestContext>(...guards: Guard<T>[]) {
	const middleware = t.middleware(async ({ ctx, next }) => {
		/**
		 * This is the only black magic required, I promise
		 */
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		let context: T = ctx;

		for (const fn of guards) {
			context = await fn(context);
		}

		return next({
			ctx: context,
		});
	});

	return t.procedure.use(middleware);
}
