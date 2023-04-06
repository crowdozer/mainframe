<script lang="ts">
	import { onMount } from 'svelte';
	import { GalaxyGenerator } from './generator';
	import Paper from '$lib/components/paper.svelte';
	import Container from '$lib/components/container.svelte';
	import { getRandomInt } from '$lib/utils/random-int';

	/**
	 * Galaxy generation is adapted from this:
	 * https://www.reddit.com/r/gamedev/comments/20ach8/how_to_generate_star_positions_in_a_2d_procedural/
	 */

	let cleanup: (() => void) | null = null;

	let canvas: HTMLCanvasElement;
	let galaxyElement: HTMLPreElement;
	let generator: GalaxyGenerator;
	let fps: number = 20;
	let alphabet: string = ' .-+01';
	let speed: number = 2;
	const numStars = 800;
	const numArms = getRandomInt(1, 3);
	const asciiWidth = 124;
	const asciiHeight = 54;

	// Stores the ascii output
	let asciiArt: string = '';

	/**
	 * Determines the rotation step.
	 * speed = how many revolutions per minute
	 * fps   = how many rotation steps to apply every second
	 */
	function getRotationStep(): number {
		const rotations = speed;
		const totalDegrees = 360 * rotations;
		const framesPerMinute = fps * 60;
		const degreesPerFrame = totalDegrees / framesPerMinute;

		return degreesPerFrame;
	}

	// Starts and restarts the galaxy sequence automatically
	// Also handles cleanup of intervals on unmount
	$: if (fps || speed || alphabet) {
		if (cleanup) {
			cleanup();
		}

		if (generator) {
			generator.rotationStep = getRotationStep();
			generator.alphabet = alphabet;
			cleanup = generator.beginIntervals(fps);
		}
	}

	onMount(() => {
		generator = new GalaxyGenerator({
			numStars,
			numArms,
			armOffsetMax: 0.75,
			canvas: canvas,
			randomOffsetXY: 0.14,
			rotationFactor: 6,
			asciiWidth,
			asciiHeight,
			alphabet: alphabet,
			rotationStep: getRotationStep(),
			onNewFrame: (ascii) => (asciiArt = ascii)
		});
		generator.initializeStars();

		// Clear the interval when the component is unmounted
		return () => {
			if (cleanup) {
				cleanup();
			}
		};
	});
</script>

<Container>
	<div class="mb-4">
		<Paper>
			<div class="p-4">
				<p class="mono text-sm">
					Galaxy simulation: {numStars} stars, {numArms}
					{numArms > 1 ? 'arms' : 'arm'}, {asciiWidth * asciiHeight} ascii chars
				</p>
				<br />
				<p class="mono text-sm">> this isn't designed to be responsive</p>
			</div>
		</Paper>
	</div>
	<div class="mb-4">
		<Paper>
			<div>
				<canvas bind:this={canvas} />
			</div>

			<div class="flex justify-center">
				<pre bind:this={galaxyElement}>{asciiArt}</pre>
			</div>

			<div class="p-8 rounded-lg">
				<div>
					<label for="alphabet" class="block text-green-500 text-sm font-mono">alphabet</label>
					<input
						id="alphabet"
						type="text"
						class="block w-full mt-1 bg-black text-green-500 border-green-400 border rounded py-1 px-2 font-mono focus:border-green-500 focus:ring-green-500"
						bind:value={alphabet}
					/>
				</div>

				<div>
					<label for="fps" class="block mt-4 text-green-500 text-sm font-mono">FPS</label>
					<select
						id="fps"
						class="block w-full mt-1 bg-black text-green-500 border-green-400 border rounded py-2 px-4 font-mono focus:border-green-500 focus:ring-green-500"
						bind:value={fps}
					>
						<option value={144}>144 FPS</option>
						<option value={60}>60 FPS</option>
						<option value={30}>30 FPS</option>
						<option value={20}>20 FPS</option>
						<option value={15}>15 FPS</option>
						<option value={10}>10 FPS</option>
					</select>
				</div>

				<div>
					<label for="speed" class="block mt-4 text-green-500 text-sm font-mono">revolutions</label>
					<select
						id="speed"
						class="block w-full mt-1 bg-black text-green-500 border-green-400 border rounded py-2 px-4 font-mono focus:border-green-500 focus:ring-green-500"
						bind:value={speed}
					>
						<option value={1}>Once per minute</option>
						<option value={2}>Twice per minute</option>
						<option value={4}>Four per minute</option>
						<option value={10}>Ten per minute</option>
					</select>
				</div>
			</div>
		</Paper>
	</div>
</Container>

<style lang="postcss">
	canvas {
		@apply hidden;
		width: 800px;
		height: 800px;
	}

	pre {
		@apply text-xs select-none whitespace-pre overflow-hidden;
		width: 800px;
		height: 800px;
	}
</style>
