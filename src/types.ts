import type { JwtPayload } from 'jsonwebtoken';

/**
 * A helper, which infers the return type of a promise
 */
export type ResolvedType<T> = T extends Promise<infer R> ? R : T;

/**
 * Auth context that is injected onto every request on Edge
 */
export type EdgeAuthState = {
	isLoggedIn: boolean;
	id?: string;
	jwt?: JwtPayload;
};

export type EdgeAuthStateGuaranteed = EdgeAuthState & {
	isLoggedIn: true;
	id: string;
	jwt: JwtPayload;
};
