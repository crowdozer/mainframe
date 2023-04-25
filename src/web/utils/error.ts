import showToast from 'svelte-french-toast';

export function toast(message: string) {
	showToast(message, {
		position: 'bottom-center',
	});
}

export function autotoast(error: any) {
	const message = error.message || 'An unknown error occurred';

	showToast(`(E${error.data.httpStatus}) ${message}`, {
		position: 'bottom-center',
	});
}
