import type { JwtPayload } from 'jsonwebtoken';

/**
 * A required helper, which infers the return type of a promise
 */
export type ResolvedType<T> = T extends Promise<infer R> ? R : T;

/**
 * DeepMerge is a utility type that deeply merges two types A and B,
 * recursively merging their nested properties. The properties of B
 * take precedence over the properties of A. It works for both object
 * and union types.
 */
export type DeepMerge<A, B> = {
	[K in keyof A | keyof B]: K extends keyof A
		? K extends keyof B
			? DeepMerge<A[K], B[K]>
			: A[K]
		: K extends keyof B
		? B[K]
		: never;
};

/**
 * Auth context that is injected onto every request on Edge
 */
export type EdgeAuthState = {
	isLoggedIn: boolean;
	id?: string;
	jwt?: JwtPayload;
};

export type EdgeAuthStateGuaranteed = {
	isLoggedIn: true;
	id: string;
	jwt: JwtPayload;
};
