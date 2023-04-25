import type { Handle } from '@sveltejs/kit';
import { CLERK_PEM } from '$env/static/private';
import jwt from 'jsonwebtoken';
import type { AuthState } from '../../types';

const splitPem = CLERK_PEM.match(/.{1,64}/g) as RegExpMatchArray;
const publicKey =
	'-----BEGIN PUBLIC KEY-----\n' + splitPem.join('\n') + '\n-----END PUBLIC KEY-----';

async function getClerkUserNetworkless(session: string | undefined): Promise<AuthState> {
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
