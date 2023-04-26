import { createTRPCRouter } from '$server/trpc';
import cacheRouter from './cache';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const router = createTRPCRouter({
	cache: cacheRouter,
});

// export type definition of API
export type Router = typeof router;
