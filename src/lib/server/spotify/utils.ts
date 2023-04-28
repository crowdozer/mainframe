import type { SpotifyAuthCode } from './types';

export function generateRandomString(length: number): string {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

export function getCode(url: URLSearchParams): SpotifyAuthCode | null {
	const code = url.get('code');
	const state = url.get('state');

	if (code && state) {
		return {
			code,
			state,
		};
	} else {
		return null;
	}
}
