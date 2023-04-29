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
 *
 * It only applies the merge to keys that are not present within O,
 * with O representing the original type's structure.
 */
// export type DeepMerge<
// 	Original,
// 	Previous extends Original,
// 	Next extends Original,
// > = {
// 	// prettier-ignore
// 	[Key in keyof Previous | keyof Next]: Key extends keyof Next
// 		// If next, use next
// 		? Next[Key]
// 		: // If not next but previous, use previous
// 		Key extends keyof Previous
// 		? Previous[Key]
// 		: // Otherwise, use original
// 		Key extends keyof Original
// 		? Original[Key]
// 		: never;
// };
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
