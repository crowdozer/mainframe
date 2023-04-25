import type { Enforcer } from '../types';
import { TRPCError } from '@trpc/server';

/**
 * Enfroces that a user is authorized
 */
const authedRequest: Enforcer = async ({ locals }) => {
	if (!locals.user.isLoggedIn) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Login Required',
		});
	}
};

export default authedRequest;
