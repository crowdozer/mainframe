import { autotoast } from './error';
import { enforceStatusCode } from './fetch';

/**
 * Client side function to hit the back-end cache
 * Gets the given key:value pair, or null if not found
 */
export async function get(key: string, fetcher = fetch): Promise<string | null> {
	const result = await fetcher('/api/cache?key=' + key)
		.then(enforceStatusCode)
		.then((data) => data.json())
		.catch(autotoast());

	if (result) return result.value;

	return null;
}

/**
 * Client side function to hit the back-end cache
 * Sets the given key:value pair, optionally with an expiration
 */
export async function set(
	key: string,
	value: string,
	expiration?: number,
	fetcher = fetch,
): Promise<void> {
	await fetcher('/api/cache?key=' + key, {
		method: 'post',
		body: JSON.stringify({
			key,
			value,
			expiration,
		}),
	})
		.then(enforceStatusCode)
		.catch(autotoast());
}
