// use my global caching system
import { increment, read, write } from '@/lib/cache'
// and get all the keys from the config
import {
	AUTH_CACHE_LOC,
	CHALLENGE_CACHE_LOC,
	NOW_CACHE_LOC,
	PLAYS_CACHE_LOC,
	SPOTIFY_API_CACHE_LIFETIME,
	PREVIOUS_CACHE_LOC,
} from '../config'
import type { Token, Verifier, NowPlaying, PreviouslyPlaying } from '../types'

/**
 * this all seems kind of obtuse and pointless but it helps me
 */

// AUTH
export async function readCachedAuth(): Promise<Token | null> {
	return read<Token>(AUTH_CACHE_LOC)
}
export async function writeAuthToCache(data: Token) {
	return write(AUTH_CACHE_LOC, data)
}

// OAUTH VERIFIER
export async function readCachedVerifier(): Promise<Verifier | null> {
	return read<Verifier>(CHALLENGE_CACHE_LOC)
}
export async function writeVerifierToCache(data: Verifier) {
	return write(CHALLENGE_CACHE_LOC, data)
}

// PLAYBACK STATE
export async function readCachedStatus(): Promise<NowPlaying | null> {
	return read<NowPlaying>(NOW_CACHE_LOC)
}
export async function writeStatusToCache(data: NowPlaying) {
	let expiration = SPOTIFY_API_CACHE_LIFETIME

	/**
	 * if we're playing, the expiration should be automatically pinned
	 * to the number of seconds until the end of the song
	 * (min: 1 to prevent an expiration of 0)
	 * (max: default to prevent stale UI)
	 */
	if (data.isPlaying) {
		const remainingMS = data.track.duration - data.track.progress
		const remainingS = Math.ceil(remainingMS / 1000)
		if (remainingS < SPOTIFY_API_CACHE_LIFETIME) {
			if (remainingS > 1) {
				expiration = remainingS
			} else {
				expiration = 1
			}
		}
	}

	// cache the "now playing" status for 10 seconds
	return write(NOW_CACHE_LOC, data, { ex: expiration })
}

// PLAYS COUNTERS
export async function readCachedPlays(id: string): Promise<number> {
	const count = await read<number>(`${PLAYS_CACHE_LOC}.${id}`)
	return Number(count) || 0
}
export async function incrementPlaysInCache(id: string) {
	return increment(`${PLAYS_CACHE_LOC}.${id}`)
}

// PREVIOUSLY PLAYING
export async function readCachedPreviouslyPlaying(): Promise<PreviouslyPlaying | null> {
	return read<PreviouslyPlaying>(PREVIOUS_CACHE_LOC)
}

export async function writePreviouslyPlayingToCache(
	id: string,
	duration: number,
	progress: number,
) {
	// pin expiration to the duration of the song
	const data = { id, duration, progress } satisfies PreviouslyPlaying
	const expiration = Math.ceil(duration - progress)
	return write(PREVIOUS_CACHE_LOC, data, { ex: expiration })
}
