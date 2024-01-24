/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

/**
 * this makes env variables explicit.
 */
interface ImportMetaEnv {
	KV_URL: string
	KV_REST_API_URL: string
	KV_REST_API_TOKEN: string
	KV_REST_API_READ_ONLY_TOKEN: string
	SPOTIFY_APP_ID: string
	SPOTIFY_CALLBACK_URL: string
}
interface ImportMeta {
	readonly env: ImportMetaEnv
}

/**
 * this is required for intellisense by the lqip plugin.
 */
declare module '*?lqip' {
	const lqip: {
		lqip: string
		width: number
		height: number
		src: string
	}
	export default lqip
}
