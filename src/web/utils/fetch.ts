/**
 * Throws an error if a request falls outside of the 2xx status range
 * Must be thrown early in the promise chain to satisfy the Response parameter
 */
export async function enforceStatusCode<T extends Response>(response: T): Promise<T> {
	if (response.ok) {
		return response;
	}

	const status = response.status;

	try {
		/**
		 * Try to get the message from the response body
		 */
		const responseBody = await response.json();
		const { message } = responseBody;

		throw new Error(`[${response.status}] ${message}`);
	} catch (error) {
		/**
		 * If that fails, try reasonably hard to infer an error message
		 */
		const message = inferStatusMessage(status) || 'Unknown';

		throw new Error(`[${response.status}] ${message}`);
	}
}

export function inferStatusMessage(code: number): string | null {
	return statusCodes[code] || null;
}

export const statusCodes: { [key: number]: string } = {
	400: 'Bad Request',
	401: 'Unauthorized',
	404: 'Not Found',
	420: 'Rate Limit',
	500: 'Server Error',
};
