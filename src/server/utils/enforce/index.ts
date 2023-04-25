import type { RequestEvent } from '@sveltejs/kit';
import type { Enforcer } from './types';
import authedRequest from './authed';
import ratelimitedRequest from './ratelimit';

/**
 * Applies the given enforcers against the request, in order, one at a time
 */
export default async function (request: RequestEvent, ...enforcers: Enforcer[]): Promise<void> {
	for (const enforcer of enforcers) {
		await enforcer(request);
	}
}

export { authedRequest, ratelimitedRequest };
