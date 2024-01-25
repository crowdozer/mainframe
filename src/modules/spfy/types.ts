/**
 * oauth stuff
 */

export type HTTPMethod = 'GET' | 'POST' | 'PUT'

export type Verifier = {
	verifier: string
	challenge: string
}

export type Token = {
	access_token: string
	token_type: 'Bearer'
	expires_in: number
	refresh_token: string
}

/**
 * playback state
 */

export type TrackData = {
	id: string
	duration: number
	progress: number
	albumText: string
	songText: string
	artistText: string
	url: string
	image: string
}

export type NowPlaying =
	| {
			isPlaying: false
			track: null
			date: Date
	  }
	| {
			isPlaying: true
			track: TrackData
			date: Date
	  }
