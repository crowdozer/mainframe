import type { RequestEvent } from '@sveltejs/kit';
import type { Enforcer } from './types';
import authedRequest from './guards/authed';
import ratelimitedRequest from './guards/ratelimit';

/**
 * Applies various guard enforcers against the request,
 * one at a time, in order
 */
export default async function guardTRPC(
	request: RequestEvent,
	...enforcers: Enforcer[]
): Promise<void> {
	for (const enforcer of enforcers) {
		await enforcer(request);
	}
}

export { authedRequest, ratelimitedRequest };
