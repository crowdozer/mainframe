/**
 * S7S Comment:
 * This is where Clerk is injected into every request.
 *
 * We want this to be fast, so no network requests or db calls.
 */

import type { Handle } from '@sveltejs/kit';
import { S7S_CLERK_PEM } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { EdgeAuthState } from '~/types';

const splitPem = S7S_CLERK_PEM.match(/.{1,64}/g) as RegExpMatchArray;
const publicKey =
	'-----BEGIN PUBLIC KEY-----\n' + splitPem.join('\n') + '\n-----END PUBLIC KEY-----';

/**
 * Infers auth state from the user's JWT token
 * See Clerk docs for implementation details
 */
async function getClerkUserNetworkless(session: string | undefined): Promise<EdgeAuthState> {
	if (!session) {
		return {
			isLoggedIn: false,
		};
	}

	try {
		const decoded = jwt.verify(session, publicKey);
		if (typeof decoded === 'string') {
			throw new Error('jwt in wrong format?');
		}

		return {
			isLoggedIn: true,
			id: decoded.sub as string,
			jwt: decoded,
		};
	} catch (error) {
		return {
			isLoggedIn: false,
		};
	}
}

/**
 * Injects Clerk authentication into every request
 */
const clerkHandler: Handle = async ({ event, resolve }) => {
	/**
	 * As soon as we get a request, have the server validate their jwt
	 * and attach it to locals
	 */
	const sessionID = event.cookies.get('__session');
	event.locals.user = await getClerkUserNetworkless(sessionID);

	return resolve(event);
};

export default clerkHandler;
