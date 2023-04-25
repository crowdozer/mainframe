import Clerk from '@clerk/clerk-js';
import { PUBLIC_CLERK_PUBLISHABLE } from '$env/static/public';
import { clerkInstance } from '$web/stores/clerk';

export async function initializeClerk() {
	if (typeof window !== 'undefined') {
		const clerk = new Clerk(PUBLIC_CLERK_PUBLISHABLE);

		await clerk.load();

		clerkInstance.set(clerk);
	}
}

export default Clerk;
