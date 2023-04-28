import { derived, writable } from 'svelte/store';
import Clerk from '@clerk/clerk-js';
import { PUBLIC_S7S_CLERK_PUBLISHABLE } from '$env/static/public';

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
	if (typeof window !== 'undefined') {
		const clerk = new Clerk(PUBLIC_S7S_CLERK_PUBLISHABLE);
		await clerk.load();
		clerkInstance.set(clerk);
	}
}
