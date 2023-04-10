/**
 * Runs the given callback at the desired framerate,
 * returns a fn to clear the interval
 */
export function asFPSinterval(callback: () => void, fps: number): () => void {
	const interval = setInterval(callback, 1000 / fps);

	return () => clearInterval(interval);
}

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
