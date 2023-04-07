import { writable, type Writable } from 'svelte/store';

export const crt: Writable<boolean> = writable(false);

export function setCRT(status: boolean) {
	return crt.update(() => status);
}
