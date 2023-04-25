import showToast, { type Toast } from 'svelte-french-toast';

/**
 * Displays a toast
 */
export function toast(message: string, opts: Partial<Toast> = {}) {
	showToast(message, {
		position: 'bottom-center',
		...opts,
	});
}

/**
 * Toasts a given tRPC error
 */
export function tRPCToast(error: any) {
	const message = error.message || 'An unknown error occurred';

	showToast(`(E${error.data.httpStatus}) ${message}`, {
		position: 'bottom-center',
	});
}

type ToastedCallback<T> = () => T;

/**
 * Runs the given callback function inside of an error boundary
 * If any errors are thrown, they are toasted
 *
 * @param prefix What to put infront of the error message
 * @param callback Function to run within the error boundary
 * @returns
 */
export function toasted<T = any>(prefix: string = '', callback: ToastedCallback<T>): T {
	try {
		return callback();
	} catch (error: any) {
		const message = error.message || 'An unknown error occurred';
		const final = prefix ? `${prefix}: ${message}` : message;

		showToast(final, {
			position: 'bottom-center',
		});

		throw error;
	}
}
