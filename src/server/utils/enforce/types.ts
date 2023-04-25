import type { RequestEvent } from '@sveltejs/kit';

export type Enforcer = (request: RequestEvent) => Promise<void>;
