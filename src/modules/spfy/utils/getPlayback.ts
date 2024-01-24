/**
 * this file is for all of the client supporting astro js
 */

import axios from 'axios'
import { refreshAuth } from './oauth'
import {
	readCachedAuth,
	readCachedPlays,
	readCachedStatus,
	writeStatusToCache,
	incrementPlaysInCache,
	readCachedPreviouslyPlaying,
	writePreviouslyPlayingToCache,
} from './cache'
import type { HTTPMethod, NowPlaying, Token, TrackData } from '../types'

/**
 * Requests current playback state
 * this is only used on initial server render when a cache entry doesn't exist
 */
export async function getPlaybackState(): Promise<NowPlaying> {
	// check if there's a valid cached response and use that instead
	const cachedStatus = await readCachedStatus()
	if (cachedStatus) {
		return {
			...cachedStatus,
			date: new Date(cachedStatus.date),
		}
	}

	// if not, get the current playback state from spotify
	const playback = await sendRequest()
	// upgrade it with some extra metadata + cache it
	const state = await enrichPlaybackState(playback)

	// write to caches
	await writeStatusToCache(state)
	if (state.isPlaying) {
		await writePreviouslyPlayingToCache(
			state.track.id,
			state.track.duration,
			state.track.progress,
		)
	}

	// we're done ... phew
	return state
}

/**
 * enriches spotify response with addtl metadata
 */
async function enrichPlaybackState(playing: any): Promise<NowPlaying> {
	// needed to mark when this entry was generated in caches
	const date = new Date()

	// if we're not playing, we can quit early
	const isPlaying = checkIsPlaying(playing)
	if (!isPlaying) {
		return {
			date,
			track: null,
			likes: 0,
			plays: 0,
			isPlaying: false,
		}
	}

	// drill down to only the data i want
	const track = {
		id: playing.item.id,
		progress: playing.progress_ms,
		duration: playing.item.duration_ms,
		albumText: playing.item.album.name,
		songText: playing.item.name,
		artistText: playing.item.artists.map((a: any) => a.name).join(', '),
		url: playing.item.external_urls.spotify,
		image: playing.item.album.images[0].url,
	} satisfies TrackData

	// we gotta check if this is a unique track play for my plays counter
	const isNewTrack = await checkIfNewTrack(track)
	if (isNewTrack) {
		await incrementPlaysInCache(track.id)
	}

	// inject the real up-to-date values
	const plays = (await readCachedPlays(track.id)) || 0
	const likes = 0

	return {
		track,
		isPlaying,
		plays,
		likes,
		date,
	}
}

async function checkIfNewTrack(track: TrackData): Promise<boolean> {
	const previous = await readCachedPreviouslyPlaying()
	// there was nothing cached = it was a long time ago
	if (!previous) return true
	// it looks like a different song
	if (previous.id !== track.id) {
		return true
	}
	// it looks like progress was reset significantly
	if (previous.progress > 60000 && track.progress < 30000) {
		return true
	}
	// probably not a new song
	return false
}

/**
 * looks at the spotify response and tries to determine if we're playing
 */
function checkIsPlaying(playback: any): boolean {
	return (
		playback.is_playing === true &&
		typeof playback !== 'undefined' &&
		typeof playback.item !== 'undefined' &&
		typeof playback.item.album !== 'undefined'
	)
}

/**
 * grabs an auth token then gets my playback state
 */
async function sendRequest(): Promise<any> {
	const auth = await readCachedAuth()
	if (!auth) {
		throw new Error('No auth detected')
	}

	const playback = await wrapRequest(
		'https://api.spotify.com/v1/me/player',
		'GET',
		auth,
	)

	return playback
}

/**
 * Wraps a request with auth
 * this is only used to request updates from spotify
 */
async function wrapRequest(
	url: string,
	method: HTTPMethod,
	auth: Token,
	// infinite loop protection
	throwOnFail = false,
): Promise<any> {
	return axios({
		url: url,
		method: method,
		headers: {
			Authorization: 'Bearer ' + auth.access_token,
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.data)
		.catch(async (err) => {
			// check if we're about to loop undesirably
			if (throwOnFail) throw err

			// check for an error that doesn't come from spotify api
			if (!err || !err?.response?.data) {
				console.log(err)
				throw new Error('unknown error')
			}

			// check our spotify error
			const data = err.response.data
			switch (true) {
				/**
				 * on expired token, just retry
				 * pass throwOnFail=true so it doesnt loop
				 */
				case data?.error?.message === 'The access token expired':
					const newAuth = await refreshAuth(auth)
					return wrapRequest(url, method, newAuth, true)

				/**
				 * if no active device, thats ok
				 */
				case data?.error?.reason === 'NO_ACTIVE_DEVICE':
					return null

				/**
				 * otherwise log and throw
				 */
				default:
					console.log(data)
					throw new Error('Spotify API request failed')
			}
		})
}
