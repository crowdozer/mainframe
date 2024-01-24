// disables admin api routes in ci/prod
export const ADMIN_ROUTES_ENABLED = process.env.NODE_ENV !== 'production'

// whether or not to cache calls to the api
export const CACHE_SPOTIFY_API_RESPONSE = true

// how long to cache api calls
export const SPOTIFY_API_CACHE_LIFETIME = 5

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
