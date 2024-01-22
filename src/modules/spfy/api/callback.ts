import type { APIRoute } from 'astro'
import { writeAuthToCache, getAuth, readCachedVerifier } from '../utils/oauth'
import { ADMIN_ROUTES_ENABLED } from '../config'

/**
 * the only purpose for this endpoint is to complete auth
 * with the spotify API to get a long lasting token
 */

// prevent astro from prerendering this
export const prerender = false

/**
 * callback handler for the spfy auth procedure
 */
export const GET: APIRoute = async function ({ url }) {
	if (!ADMIN_ROUTES_ENABLED) {
		return new Response(null, { status: 401 })
	}

	const cachedVerifier = await readCachedVerifier()
	if (!cachedVerifier) {
		return new Response('missing verifier', { status: 500 })
	}

	const authCode = url.searchParams.get('code')
	if (!authCode) {
		return new Response('missing auth code', { status: 400 })
	}

	const auth = await getAuth(authCode, cachedVerifier.verifier)
	await writeAuthToCache(auth)

	return new Response('ok')
}
