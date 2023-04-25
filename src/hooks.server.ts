import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import trpcHandler from '$server/hooks/trpc';
import clerkHandler from '$server/hooks/clerk';

export const handle: Handle = sequence(
	// Auth must happen first
	clerkHandler,
	// tRPC happens second
	trpcHandler,
);
