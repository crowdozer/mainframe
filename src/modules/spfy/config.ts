import { isDev } from '@/lib/dev'

// disables admin api routes in ci/prod
export const ADMIN_ROUTES_ENABLED = isDev

// how long to cache api calls
// this can be fairly high, because it will taper off near
// the end of songs to prevent the ui from being delayed
export const SPOTIFY_API_CACHE_LIFETIME = 15

// how long the front end should wait before checking updates
// this can also be fairly high, because it also tapers off near
// the end of songs
export const CLIENT_HTMX_IDLE_DURATION = 30

// spotify-cli app ID
export const SPOTIFY_APP_ID = import.meta.env.SPOTIFY_APP_ID

// the base URL for our auth callbacks
export const CALLBACK_BASE_URL = import.meta.env.SPOTIFY_CALLBACK_URL

// all scopes required by the app
export const SCOPES = [
	'user-read-playback-state',
	'user-modify-playback-state',
].join(' ')

// spotify auth url
export const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'

// where to cache auth -- badly named
export const AUTH_CACHE_LOC = 'spfy.auth'
export const CHALLENGE_CACHE_LOC = 'spfy.challenge'
export const NOW_CACHE_LOC = 'spfy.now'
export const PREVIOUS_CACHE_LOC = 'spfy.prev'
export const LIKES_CACHE_LOC = 'spfy.likes'
export const PLAYS_CACHE_LOC = 'spfy.plays'
