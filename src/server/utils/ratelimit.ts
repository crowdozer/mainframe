import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { dev } from '$app/environment';
import { error, type RequestEvent } from '@sveltejs/kit';

// process.env fix for Redis.fromEnv()
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';
process.env.UPSTASH_REDIS_REST_TOKEN = UPSTASH_REDIS_REST_TOKEN;
process.env.UPSTASH_REDIS_REST_URL = UPSTASH_REDIS_REST_URL;

const prefix = dev ? '@mainframe/dev/ratelimit' : '@mainframe/prod/ratelimit';

// Create a new ratelimiter, that allows 3 requests per 1 minute
export const ratelimiter = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(3, '1 m'),
	analytics: true,
	/**
	 * Optional prefix for the keys used in redis. This is useful if you want to share a redis
	 * instance with other applications and want to avoid key collisions. The default prefix is
	 * "@upstash/ratelimit"
	 */
	prefix: prefix,
});

export async function ratelimit({ locals, getClientAddress }: RequestEvent) {
	const key = locals.user.isLoggedIn
		? // use their userid
		  'user:' + locals.user.id
		: // use their ip address
		  'ip:' + getClientAddress();

	const { success } = await ratelimiter.limit(key);

	if (!success) {
		throw error(420, 'Too many requests');
	}
}