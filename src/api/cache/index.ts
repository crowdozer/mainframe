import { z } from 'zod';
import { createTRPCRouter, procedure } from '$api/trpc';
import enforceTRPC, { ratelimitedRequest, authedRequest } from '$server/guardTRPC/index.js';
import { cache } from '$server/cache/index.js';

const prefix = 'web:';
const expiration = 60 * 60 * 24 * 7; // 7 days

const router = createTRPCRouter({
	/**
	 * returns whatever is in the cache at url.key
	 */
	get: procedure
		.input(
			z.object({
				key: z.string(),
			}),
		)
		.query(async (request) => {
			await enforceTRPC(request.ctx.event, ratelimitedRequest);

			const key = prefix + request.input.key;
			const value = await cache.get(key);
			return { value };
		}),
	/**
	 * sets the new cache value at url.key,
	 * optionally with an expiration timer in seconds
	 */
	set: procedure
		.input(
			z.object({
				key: z.string(),
				value: z.string(),
			}),
		)
		.mutation(async (request) => {
			await enforceTRPC(request.ctx.event, authedRequest, ratelimitedRequest);

			const key = prefix + request.input.key;
			await cache.set(key, request.input.value);
			await cache.expire(key, expiration);
		}),
});

export type Router = typeof router;
export default router;
