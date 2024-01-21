import axios from 'axios'
import {
	readCachedAuth,
	refreshAuth,
	type HTTPMethod,
	readCachedStatus,
	type NowPlaying,
	writeStatusToCache,
} from './utils'

/**
 * Requests current playback state
 */
export default async function getPlaybackState(): Promise<NowPlaying> {
	const cachedStatus = await readCachedStatus()
	if (cachedStatus) {
		return {
			...cachedStatus,
			date: new Date(cachedStatus.date),
		}
	}

	const playing = await wrapRequest(
		'https://api.spotify.com/v1/me/player',
		'GET',
	)

	const status = { playing, date: new Date() }
	await writeStatusToCache(status)
	return status
}

/**
 * Wraps a request with auth
 */
export async function wrapRequest(
	url: string,
	method: HTTPMethod,
	data: any = undefined,
): Promise<any> {
	const auth = await readCachedAuth()
	if (!auth) {
		throw new Error('No auth detected')
	}

	return axios({
		url: url,
		method: method,
		headers: {
			Authorization: 'Bearer ' + auth.access_token,
			'Content-Type': 'application/json',
		},
		data: method === 'GET' ? undefined : JSON.stringify(data),
	})
		.then((res) => res.data)
		.catch(async (err) => {
			if (!err || !err?.response?.data) {
				console.log(err)
				throw new Error('unknown error')
			}

			const data = err.response.data

			switch (true) {
				case data?.error?.message === 'The access token expired':
					// if our token is expired, refresh and try again
					await refreshAuth(auth)
					return wrapRequest(url, method, data)
				case data?.error?.reason === 'NO_ACTIVE_DEVICE':
					return console.log(
						'No active playback - configure one with `spfy devices`',
					)
				default:
					console.log(data)
					throw new Error('Spotify API request failed')
			}
		})
}
