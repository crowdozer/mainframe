import { createTRPCRouter } from '$server/trpc';
import cacheRouter from './cache';
import spotifyRouter from './spotify';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const router = createTRPCRouter({
	cache: cacheRouter,
	spotify: spotifyRouter,
});

// export type definition of API
export type Router = typeof router;
