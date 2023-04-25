import { cache } from '$api/utils/cache/index.js';
import { error, json } from '@sveltejs/kit';
import enforce, { ratelimitedRequest, authedRequest } from '$api/utils/enforce/index.js';

const prefix = 'web:';
const expiration = 60 * 60 * 24 * 7; // 7 days

/**
 * returns whatever is in the cache at url.key
 */
export async function GET(request) {
	await enforce(request, ratelimitedRequest);

	const key = request.url.searchParams.get('key') ?? '';
	if (!key) {
		throw error(400, 'url.key required');
	}

	const value = await cache.get(prefix + key);

	return json({
		value,
	});
}

/**
 * sets the new cache value at url.key,
 * optionally with an expiration timer in seconds
 */
export async function POST(request) {
	await enforce(request, authedRequest, ratelimitedRequest);

	const key = request.url.searchParams.get('key') ?? '';
	if (!key) {
		throw error(400, 'body.key required');
	}

	const { value } = await request.request.json();

	await cache.set(prefix + key, value);
	await cache.expire(prefix + key, expiration);

	return new Response();
}
