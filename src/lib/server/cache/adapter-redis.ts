import Redis from 'ioredis';
import type { MakeAdapter } from './types';
import { UPSTASH_REDIS_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

// ensure a valid redis config exists
if (!UPSTASH_REDIS_URL) {
	throw error(400, 'no redis config provided');
}

// create the redis client
export const client = new Redis(UPSTASH_REDIS_URL);

// create the adapter
const makeRedisAdapter: MakeAdapter = (prefix: string) => ({
	async get(key: string): Promise<string | null> {
		return client.get(prefix + key);
	},

	async set(key: string, value: string) {
		await client.set(prefix + key, value);

		return;
	},

	async expire(key: string, seconds: number) {
		await client.expire(prefix + key, seconds);
	},
});

// expose adapter, but not client
export { makeRedisAdapter };
