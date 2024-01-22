/**
 * this file is exclusively for interfacing with the spotify api
 */

import axios from 'axios'
import { createHash } from 'crypto'
import { read, write } from '@/lib/cache'
import {
	SPOTIFY_APP_ID,
	CALLBACK_BASE_URL,
	SCOPES,
	SPOTIFY_AUTH_URL,
	AUTH_CACHE_LOC,
	CHALLENGE_CACHE_LOC,
	NOW_CACHE_LOC,
	SPOTIFY_API_CACHE_LIFETIME,
} from '../config'

// ...
// ...
// ... TYPES
// ...
// ...

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

export type NowPlaying = {
	playing: any
	date: Date
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT'

// ...
// ...
// ... SETUP HELPER FUNCTIONS
// ...
// ...

/**
 * sets up the auth request by generating a code verifier,
 * hash, code chalelnge, and redirect url
 */
export async function setupAuthRequest(): Promise<string> {
	const codeVerifier = generateRandomString(64)
	const hashed = await sha256(codeVerifier)
	const codeChallenge = base64encode(hashed)

	const url =
		SPOTIFY_AUTH_URL +
		'?response_type=code' +
		'&client_id=' +
		encodeURIComponent(SPOTIFY_APP_ID) +
		'&scope=' +
		encodeURIComponent(SCOPES) +
		'&code_challenge_method=S256' +
		'&code_challenge=' +
		encodeURIComponent(codeChallenge) +
		'&redirect_uri=' +
		encodeURIComponent(CALLBACK_BASE_URL)

	// the verifier needs to outlive the request lifecycle
	await writeVerifierToCache({
		verifier: codeVerifier,
		challenge: codeChallenge,
	})

	// the url needs to be used for a redirect
	return url
}

function generateRandomString(length: number): string {
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const values = crypto.getRandomValues(new Uint8Array(length))
	return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

async function sha256(plain: string): Promise<Buffer> {
	return createHash('sha256').update(plain).digest()
}

function base64encode(input: Buffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(input)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
}

// ...
// ...
// ... TOKEN HELPER FUNCTIONS
// ...
// ...

/**
 * trades the authcode and codeverifier for a authtoken
 */
export async function getAuth(
	authCode: string,
	codeVerifier: string,
): Promise<Token> {
	return axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: new URLSearchParams({
			client_id: SPOTIFY_APP_ID,
			grant_type: 'authorization_code',
			code: authCode,
			redirect_uri: CALLBACK_BASE_URL,
			code_verifier: codeVerifier,
		}),
	})
		.then((res) => res.data)
		.catch((err) => {
			if (err && err?.response?.data) {
				console.log(err.response.data)
				throw new Error('spotify auth failed')
			}

			throw new Error('unknown error')
		})
}

/**
 * Takes expired auth info and refreshes it, so it can be used again
 */
export async function refreshAuth(token: Token): Promise<Token> {
	// trade the refresh token for the new auth token
	const newToken = await axios({
		url: 'https://accounts.spotify.com/api/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		data: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: token.refresh_token,
			client_id: SPOTIFY_APP_ID,
		}),
	})
		.then((res) => res.data)
		.catch((err) => {
			console.log(err)
			throw new Error('Error refreshing auth token. Please run spfy auth again')
		})

	// cache and return the new token
	writeAuthToCache(newToken)
	return newToken
}

// ...
// ...
// ... CACHE HELPER FUNCTIONS
// ...
// ...

export async function readCachedAuth(): Promise<Token | null> {
	return read<Token>(AUTH_CACHE_LOC)
}

export async function writeAuthToCache(data: Token) {
	return write(data, AUTH_CACHE_LOC)
}

export async function readCachedVerifier(): Promise<Verifier | null> {
	return read<Verifier>(CHALLENGE_CACHE_LOC)
}

export async function writeVerifierToCache(data: Verifier) {
	return write(data, CHALLENGE_CACHE_LOC)
}

export async function readCachedStatus(): Promise<NowPlaying | null> {
	return read<NowPlaying>(NOW_CACHE_LOC)
}

export async function writeStatusToCache(data: NowPlaying) {
	// cache the "now playing" status for 10 seconds
	return write(data, NOW_CACHE_LOC, { ex: SPOTIFY_API_CACHE_LIFETIME })
}
