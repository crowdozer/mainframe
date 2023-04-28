import { TRPCError } from '@trpc/server';
import type { EdgeAuthStateGuaranteed } from '~/types';
import type { Guard, InferredRequestContext, WithLocals } from '../config';

type ModifiedContext = WithLocals<{ user: EdgeAuthStateGuaranteed }>;

/**
 * Enforces that a user is authorized
 */
const authedRequest: Guard<InferredRequestContext, ModifiedContext> = async (
	req: InferredRequestContext,
) => {
	const { locals } = req.event;

	if (!locals.user.isLoggedIn) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Login Required',
		});
	}

	return req as ModifiedContext;
};

export default authedRequest;
