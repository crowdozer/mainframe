import { TRPCError } from '@trpc/server';
import type { EdgeAuthStateGuaranteed } from '~/types';
import type { InferredRequestContext, WithLocals } from '../';

/**
 * Enforces that a user is authorized
 */
const authedRequest = async (req: InferredRequestContext) => {
	const { locals } = req.event;

	if (!locals.user.isLoggedIn) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Login Required',
		});
	}

	return req as WithLocals<{ user: EdgeAuthStateGuaranteed }>;
};

export default authedRequest;
