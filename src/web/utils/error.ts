import showToast from 'svelte-french-toast';

export function toast(message: string) {
	showToast(message, {
		position: 'bottom-center',
	});
}

export function autotoast(prefix = '') {
	return function (error: any): void {
		const message = error.message || 'An unknown error occurred';

		showToast(prefix + message, {
			position: 'bottom-center',
		});
	};
}
