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

/**
 * Attempts to measure device FPS
 */
export async function measureFPS(): Promise<number> {
	// Define the duration of the performance testing in milliseconds
	const testDuration = 1000;

	const startTime = performance.now();
	let frames = 0;

	return new Promise<number>((resolve) => {
		const loop = (timestamp: number) => {
			frames++;
			const elapsed = timestamp - startTime;
			if (elapsed >= testDuration) {
				const fps = frames / (elapsed / 1000);
				resolve(fps);
			} else {
				requestAnimationFrame(loop);
			}
		};

		requestAnimationFrame(loop);
	});
}
