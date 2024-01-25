/**
 * this file is for all of the client supporting astro js
 */

import axios from 'axios'
import { refreshAuth } from './oauth'
import { readCachedAuth, readCachedStatus, writeStatusToCache } from './cache'
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

	return {
		track,
		isPlaying,
		date,
	}
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
