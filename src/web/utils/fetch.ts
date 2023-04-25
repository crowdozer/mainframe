export function enforceStatusCode<T extends Response>(response: T): T {
	if (!response.ok) {
		throw new Error(`[${response.status}] ${response.statusText}`);
	}

	return response;
}
