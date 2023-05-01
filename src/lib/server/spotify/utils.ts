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

/**
 * Helper that tries to parse spotify errors for certain descriptions
 */
export function getErrorDescription(error: any): string {
	if (error && error.body && error.body.error_description) {
		return error.body.error_description;
	}

	return error.message || 'An unknown error has occurred';
}
