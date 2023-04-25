import { derived, writable } from 'svelte/store';
import Clerk from '@clerk/clerk-js';
import { PUBLIC_CLERK_PUBLISHABLE } from '$env/static/public';

/**
 * Store containing the Clerk instance
 */
export const clerkInstance = writable<Clerk>();

/**
 * Store containing the clerk user
 */
export const clerkUser = derived([clerkInstance], function ([clerk]) {
	if (!clerk) {
		return {
			user: null,
			loading: true,
		};
	}

	return {
		user: clerk.user,
		isLoading: false,
	};
});

/**
 * Function to initialize clerk for the app
 * Intended for prehydration during SSR
 */
export async function initialize() {
	const clerk = new Clerk(PUBLIC_CLERK_PUBLISHABLE);

	if (typeof window !== 'undefined') {
		await clerk.load();
	}

	clerkInstance.set(clerk);
}
