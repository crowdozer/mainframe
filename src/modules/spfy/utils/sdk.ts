/**
 * this file is for all of the client supporting astro js
 */

import axios from 'axios'
import {
	readCachedAuth,
	refreshAuth,
	readCachedStatus,
	writeStatusToCache,
	type HTTPMethod,
	type NowPlaying,
	type Token,
} from './oauth'
import { CACHE_SPOTIFY_API_RESPONSE } from '../config'

/**
 * Requests current playback state
 * this is only used on initial server render when a cache entry doesn't exist
 */
export async function getPlaybackState(): Promise<NowPlaying> {
	if (CACHE_SPOTIFY_API_RESPONSE) {
		// check if the status was received recently
		const cachedStatus = await readCachedStatus()
		if (cachedStatus) {
			return {
				...cachedStatus,
				date: new Date(cachedStatus.date),
			}
		}
	}

	// if not, get auth and request status
	const auth = await readCachedAuth()
	if (!auth) {
		throw new Error('No auth detected')
	}

	const playing = await wrapRequest(
		'https://api.spotify.com/v1/me/player',
		'GET',
		auth,
	)

	// update cache
	const status = { playing, date: new Date() }
	if (CACHE_SPOTIFY_API_RESPONSE) {
		await writeStatusToCache(status)
	}
	return status
}

/**
 * Wraps a request with auth
 * this is only used to request updates from spotify
 */
export async function wrapRequest(
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