import type { APIRoute } from 'astro'
import { setupAuthRequest } from '../utils/server'
import { ADMIN_ROUTES_ENABLED } from '../config'

// prevent astro from prerendering this
export const prerender = false

/**
 * coming here initiates the backend spfy auth procedure
 *
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */
export const GET: APIRoute = async function ({ redirect }) {
	if (!ADMIN_ROUTES_ENABLED) {
		return new Response(null, { status: 401 })
	}

	const url = await setupAuthRequest()

	return redirect(url, 303)
}
