import type { APIRoute } from 'astro'
import { writeAuthToCache, getAuth } from '@/lib/spfy/utils'
import { readCachedVerifier } from '@/lib/spfy/utils'

const ENABLED = process.env.NODE_ENV !== 'production'

export const prerender = false

/**
 * callback handler for the spfy auth procedure
 *
 * @see /pages/api/spfy/auth
 */
export const GET: APIRoute = async function ({ url }) {
	if (!ENABLED) {
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
