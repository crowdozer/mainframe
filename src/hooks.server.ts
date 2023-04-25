import type { Handle } from '@sveltejs/kit';
import Clerk from '@clerk/clerk-sdk-node/esm/instance';
import { CLERK_UNPUBLISHABLE } from '$env/static/private';

/**
 * Inject Clerk authentication into every request
 */
export const handle = (async ({ event, resolve }) => {
	const clerk = Clerk({
		secretKey: CLERK_UNPUBLISHABLE
	});

	const session = event.cookies.get('__clerk');
	if (session) {
		console.log('session', session);
		event.locals.user = 'foo';
	} else {
		event.locals.user = null;
	}

	return resolve(event);
}) satisfies Handle;
