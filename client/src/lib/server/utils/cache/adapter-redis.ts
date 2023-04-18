import Redis from 'ioredis';
import type { MakeAdapter } from './types';
import { SRV_REDIS_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

// ensure a valid redis config exists
if (!SRV_REDIS_URL) {
	throw error(400, 'no redis config provided');
}

// create the redis client
const client = new Redis(SRV_REDIS_URL);

// create the adapter
const makeRedisAdapter: MakeAdapter = (prefix: string) => ({
	async get(key: string): Promise<string | null> {
		return client.get(prefix + key);
	},

	async set(key: string, value: string) {
		await client.set(prefix + key, value);

		return;
	}
});

// expose adapter, but not client
export { makeRedisAdapter };