import { type MiddlewareHandler } from 'astro'
import { ipAddress } from '@vercel/edge'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'
import { isDev } from './lib/dev'

/**
 * define all urls which will be ratelimited
 */
const RATELIMITED_URLS = new Set([
	'/api/ytdl',
	'/api/spfy/auth',
	'/api/spfy/callback',
	'/partials/spotify',
])

/**
 * whether or not to apply ratelimiting in dev
 */
const RATELIMIT_IN_DEV = false

/**
 * monkeypatch certain required process.env values
 * that astro/vite don't set by default.
 */
if (process.env.NODE_ENV === 'development') {
	process.env.KV_URL = import.meta.env.KV_URL
	process.env.KV_REST_API_URL = import.meta.env.KV_REST_API_URL
	process.env.KV_REST_API_TOKEN = import.meta.env.KV_REST_API_TOKEN
	process.env.KV_REST_API_READ_ONLY_TOKEN =
		import.meta.env.KV_REST_API_READ_ONLY_TOKEN
}

/**
 * standard ratelimit config with a slightly more generous window
 */
export const ratelimiter = new Ratelimit({
	redis: kv,
	prefix: 'ratelimiter:',
	// 5 requests from the same IP in 10 seconds
	limiter: Ratelimit.slidingWindow(5, '3 s'),
})

/**
 * register astro middleware to ratelimit certain routes.
 */
export const onRequest: MiddlewareHandler = async ({ request, url }, next) => {
	// ensure we only limit certain routes
	if (!RATELIMITED_URLS.has(url.pathname)) {
		return next()
	}
	// ignore development routes, if configured to
	if (isDev && !RATELIMIT_IN_DEV) {
		return next()
	}

	/**
	 * try to ratelimit based on the user's ip
	 */
	const ip = ipAddress(request) || '127.0.0.1'
	try {
		const {
			success,
			reset,
			// pending,
			// limit,
			// remaining
		} = await ratelimiter.limit(ip)

		// let the user through if it worked
		if (success) {
			return next()
		}

		// if it didn't work, they got ratelimited
		return new Response(
			JSON.stringify({
				message: 'too many requests',
				cooldown: reset,
			}),
			{
				status: 420,
			},
		)
	} catch (error) {
		/**
		 * in this event, the ratelimit attempt failed.
		 * nothing we can really do about it but its best
		 * to not let them through.
		 */
		console.error(error)
		return new Response(
			JSON.stringify({
				message: 'temporarily unavailable',
			}),
			{
				status: 503,
			},
		)
	}
}
