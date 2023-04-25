/**
 * Throws an error if a request falls outside of the 2xx status range
 * Must be thrown early in the promise chain to satisfy the Response parameter
 */
export function enforceStatusCode<T extends Response>(response: T): T {
	if (!response.ok) {
		const status = response.status;
		const message = inferStatusMessage(status) || response.statusText || 'Unknown';

		throw new Error(`[${response.status}] ${message}`);
	}

	return response;
}

export function inferStatusMessage(code: number): string | null {
	return statusCodes[code] || null;
}

export const statusCodes: { [key: number]: string } = {
	400: 'Bad Request',
	401: 'Unauthorized',
	404: 'Not Found',
	420: 'Rate Limit',
	500: 'Server Error'
};
