import type { JwtPayload } from 'jsonwebtoken';

/**
 * A required helper, which infers the return type of a promise
 */
export type ResolvedType<T> = T extends Promise<infer R> ? R : T;

/**
 * Utility type, useful for defining the return type for your guards
 */
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility type, merges two objects deeply
 */
export type DeepMerge<Original, Previous extends Original, Next> = {
	[Key in keyof Previous | keyof Next]: Key extends keyof Next
		? Next[Key]
		: Key extends keyof Previous
		? Previous[Key]
		: Key extends keyof Original
		? Original[Key]
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
