import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// process.env fix for Redis.fromEnv()
import { S7S_UPSTASH_REDIS_REST_TOKEN, S7S_UPSTASH_REDIS_REST_URL } from '$env/static/private';
import { TRPCError } from '@trpc/server';
import type { Guard, InferredRequestContext } from '../config';
process.env.UPSTASH_REDIS_REST_TOKEN = S7S_UPSTASH_REDIS_REST_TOKEN;
process.env.UPSTASH_REDIS_REST_URL = S7S_UPSTASH_REDIS_REST_URL;

// Create a new ratelimiter allowing 60 requests 1 minute
export const ratelimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(60, '1 m'),
	analytics: true,
	/**
	 * Optional prefix for the keys used in redis. This is useful if you want to share a redis
	 * instance with other applications and want to avoid key collisions. The default prefix is
	 * "@upstash/ratelimit"
	 */
	prefix: '@S7S/ratelimit',
});

/**
 * Enforces that the user isn't spamming requests
 */
const ratelimitedRequest: Guard<InferredRequestContext, InferredRequestContext> = async (req) => {
	const { locals, getClientAddress } = req.event;

	const key = locals.user.isLoggedIn
		? // use their userid
		  'user:' + locals.user.id
		: // use their ip address
		  'ip:' + getClientAddress();

	const { success } = await ratelimiter.limit(key);

	if (!success) {
		throw new TRPCError({
			code: 'TOO_MANY_REQUESTS',
			message: 'Rate limited',
		});
	}

	return req;
};

export default ratelimitedRequest;
