import { dev } from '$app/environment';
import { makeRedisAdapter } from './adapter-redis';
import type { Adapter } from './types';

const prefix = dev ? '@mainframe/dev/' : '@mainframe/prod/';

/**
 * Primary i/o for the cache used by the website
 * All requests should go through this adapter, and any
 * client requests should first go through API or tRPC first,
 * to prevent unintended/unauthorized use
 */
const cache: Adapter = makeRedisAdapter(prefix);

export { cache };
