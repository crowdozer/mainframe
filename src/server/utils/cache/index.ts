import { dev } from '$app/environment';
import { makeRedisAdapter } from './adapter-redis';
import type { Adapter } from './types';

const prefix = dev ? '@mainframe/dev/' : '@mainframe/prod/';
const cache: Adapter = makeRedisAdapter(prefix);

export { cache };
