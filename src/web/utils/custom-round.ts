/**
 * Round the given number to the nearest digit present in an array of numbers
 * The function uses the Array.reduce() method to iterate over each value in the
 * array and find the value with the smallest absolute difference to the given number.
 * It then returns that value.
 */
export function roundToNearest(num: number, arr: number[]): number {
	return arr.reduce((prev, curr) => {
		return Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev;
	});
}
