/**
 * Checks whether two arrays contain any intersections
 * (shared values)
 */
export function intersects(arr1: string[], arr2: string[]): boolean {
	return arr1.some((value) => arr2.includes(value));
}
