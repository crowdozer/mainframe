import { kv } from '@vercel/kv'

/**
 * attempts to read from disk and json decode
 */
export async function read<T = any>(location: string): Promise<T | null> {
	try {
		const key = `cache.${location}`
		const value = await kv.get(key)

		if (value === null) {
			return null
		}

		return value as T
	} catch (error: unknown) {
		console.log('Error reading or parsing from cache at %s', location)
	}

	return null
}

/**
 * attempts to write to disc
 *
 * for valid options,
 * @see https://redis.io/commands/set/
 */
export async function write<T = any>(
	data: T,
	location: string,
	opts?: any,
): Promise<void> {
	const key = `cache.${location}`

	await kv.set(key, data, opts)
}
