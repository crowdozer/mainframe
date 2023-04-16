import { cache } from '$lib/server/utils/cache/index.js';
import { error, json } from '@sveltejs/kit';

/**
 * returns whatever is in the cache at url.key
 */
export async function GET({ url }) {
	const key = url.searchParams.get('key') ?? '';

	if (!key) {
		throw error(400, 'url.key required');
	}

	const value = await cache.get(key);

	return json({
		value
	});
}

/**
 * sets the new cache value at url.key
 */
export async function POST(request) {
	const key = request.url.searchParams.get('key') ?? '';
	const { value } = await request.request.json();

	if (!key) {
		throw error(400, 'body.key required');
	}

	await cache.set(key, value);

	return new Response();
}
