import { kv } from '@vercel/kv'
import { logDev } from './dev'

/**
 * attempts to read from disk and json decode
 */
export async function read<T = any>(location: string): Promise<T | null> {
	try {
		const key = `cache.${location}`
		const value = await kv.get(key)

		if (value === null) {
			logDev('cache miss: %s', key)
			return null
		}

		logDev('cache hit: %s', key)
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
	location: string,
	data: T,
	opts?: any,
): Promise<void> {
	const key = `cache.${location}`

	logDev('cache write: %s', key)

	await kv.set(key, data, opts)
}

/**
 * increments the given key
 */
export async function increment(location: string): Promise<void> {
	const key = `cache.${location}`

	logDev('cache write: %s', key)

	await kv.incr(key)
}
