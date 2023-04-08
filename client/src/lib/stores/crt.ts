import { writable, type Writable } from 'svelte/store';

export const crt: Writable<boolean> = writable(true);

export function setCRT(status: boolean) {
	return crt.update(() => status);
}
