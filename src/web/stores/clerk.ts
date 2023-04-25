import { derived, writable } from 'svelte/store';
import type Clerk from '@clerk/clerk-js';

export const clerkInstance = writable<Clerk>();

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
