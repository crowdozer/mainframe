import { error } from '@sveltejs/kit';
import type { Enforcer } from './types';

/**
 * Enfroces that a user is authorized
 */
const authedRequest: Enforcer = async ({ locals }) => {
	if (!locals.user.isLoggedIn) {
		throw error(401, 'Login required');
	}
};

export default authedRequest;
