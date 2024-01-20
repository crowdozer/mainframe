import { type MiddlewareHandler } from 'astro'
import { ipAddress } from '@vercel/edge'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

const ratelimit = new Ratelimit({
	redis: kv,
	// 5 requests from the same IP in 10 seconds
	limiter: Ratelimit.slidingWindow(5, '3 s'),
})

const urls = new Set(['/api/ytdl', '/partials/spotify'])

export const onRequest: MiddlewareHandler = async ({ request, url }, next) => {
	if (process.env.NODE_ENV === 'development') {
		return next()
	}

	if (!urls.has(url.pathname)) {
		return next()
	}

	// You could alternatively limit based on user ID or similar
	const ip = ipAddress(request) || '127.0.0.1'

	const { success, pending, limit, reset, remaining } =
		await ratelimit.limit(ip)

	return success
		? next()
		: new Response(
				JSON.stringify({
					message: 'slow down!',
					next: reset,
				}),
				{
					status: 420,
				},
		  )
}
