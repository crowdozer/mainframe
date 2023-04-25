import type { Handle } from '@sveltejs/kit';
import { createContext } from '$api/trpc';
import { router } from '$api/router';
import { createTRPCHandle } from 'trpc-sveltekit';

/**
 * Injects trpc support into svelte-kit
 */
const trpcHandler: Handle = createTRPCHandle({ router, createContext });

export default trpcHandler;
