import { createTRPCRouter, RateLimitedProcedure, AuthedRateLimitedProcedure } from '$server/trpc';
import { cache } from '$server/cache/index.js';
import { z } from 'zod';

const prefix = 'web:';
const expiration = 60 * 60 * 24 * 7; // 7 days

const router = createTRPCRouter({
	/**
	 * returns whatever is in the cache at url.key
	 */
	get: RateLimitedProcedure.input(
		z.object({
			key: z.string(),
		}),
	).query(async (request) => {
		const key = prefix + request.input.key;
		const value = await cache.get(key);
		return { value };
	}),
	/**
	 * sets the new cache value at url.key,
	 * optionally with an expiration timer in seconds
	 */
	set: AuthedRateLimitedProcedure.input(
		z.object({
			key: z.string(),
			value: z.string(),
		}),
	).mutation(async (request) => {
		const key = prefix + request.input.key;
		await cache.set(key, request.input.value);
		await cache.expire(key, expiration);
	}),
});

export type Router = typeof router;
export default router;
