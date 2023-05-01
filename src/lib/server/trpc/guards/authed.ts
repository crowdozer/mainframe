import { TRPCError, type DeepPartial } from '@trpc/server';
import type { EdgeAuthStateGuaranteed } from '~/types';
import {
	makeGuardedProcedure,
	type Guard,
	type InferredRequestContext,
	type WithLocals,
} from '../config';

/**
 * Enforces that a user is authorized
 */
export const authedRequest: Guard<InferredRequestContext> = async (req) => {
	const { locals } = req.event;

	if (!locals.user.isLoggedIn) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Login Required',
		});
	}

	return {
		event: {
			locals: {
				user: req.event.locals.user as EdgeAuthStateGuaranteed,
			},
		},
	} satisfies DeepPartial<InferredRequestContext>;
};

export const AuthedProcedure =
	makeGuardedProcedure<WithLocals<{ user: EdgeAuthStateGuaranteed }>>(authedRequest);
