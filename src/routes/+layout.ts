import type { LayoutLoad } from './$types';
import { initialize } from '$web/stores/clerk';

export const load = (async () => {
	/**
	 * Prehydrate the Clerk User store
	 */
	console.log('ssr start')
	await initialize();
	console.log('ssr end')

	// We don't actually need to return any data
	return {
		// ...
	};
}) satisfies LayoutLoad;
