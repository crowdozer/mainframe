import { setupAuthRequest } from '@/lib/spfy/utils'
import type { APIRoute } from 'astro'

const ENABLED = process.env.NODE_ENV !== 'production'

export const prerender = false

/**
 * coming here initiates the backend spfy auth procedure
 *
 * @see https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */
export const GET: APIRoute = async function ({ redirect }) {
	if (!ENABLED) {
		return new Response(null, { status: 401 })
	}

	const url = await setupAuthRequest()

	return redirect(url, 303)
}
