/**
 * Throws an error if a request falls outside of the 2xx status range
 * Must be thrown early in the promise chain to satisfy the Response parameter
 */
export function enforceStatusCode<T extends Response>(response: T): T {
	if (!response.ok) {
		throw new Error(`[${response.status}] ${response.statusText}`);
	}

	return response;
}
