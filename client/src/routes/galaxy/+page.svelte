<script lang="ts">
	import { onMount } from 'svelte';
	import { GalaxyGenerator } from './generator';
	import Paper from '../../components/paper.svelte';

	/**
	 * Galaxy generation is adapted from this:
	 * https://www.reddit.com/r/gamedev/comments/20ach8/how_to_generate_star_positions_in_a_2d_procedural/
	 */

	let canvas: HTMLCanvasElement;
	let galaxyElement: HTMLPreElement;
	let generator: GalaxyGenerator;
	let fps: number = 30;
	let alphabet: string = ' .-+01';
	let speed: number = 2;
	// Stores the current rendering interval
	let interval: number;
	// Stores the ascii output
	let asciiArt: string = '';

	$: if (fps || speed || alphabet) {
		if (generator) {
			generator.rotationStep = getRotationStep();
			generator.alphabet = alphabet;
			startRenderInterval();
		}
	}

	// Step the galaxy and render it repeatedly
	function startRenderInterval() {
		console.log('restarting');

		// Clears any existing intervals
		clearInterval(interval);

		// Set an interval to rotate the galaxy and update the ASCII art at a specified frame rate
		interval = setInterval(() => {
			generator.rotateGalaxy();
			asciiArt = generator.renderFrame();
		}, 1000 / fps);
	}

	/**
	 * Determines the rotation step.
	 * speed = how many revolutions per minute
	 * fps   = how many rotation steps to apply every second
	 *
	 */
	// Returns the desired rotation step, rotating [speed] times per minute
	function getRotationStep(): number {
		const rotations = speed;
		const totalDegrees = 360 * rotations;
		const framesPerMinute = fps * 60;
		const degreesPerFrame = totalDegrees / framesPerMinute;

		return degreesPerFrame;
	}

	onMount(() => {
		generator = new GalaxyGenerator({
			numStars: 800,
			numArms: 2,
			armOffsetMax: 0.75,
			canvas: canvas,
			randomOffsetXY: 0.14,
			rotationFactor: 6,
			targetWidth: 110,
			targetHeight: 42,
			alphabet: alphabet,
			rotationStep: getRotationStep()
		});
		generator.initializeStars();

		// Clear the interval when the component is unmounted
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col gap-4">
	<Paper>
		<div>
			<canvas bind:this={canvas} />
		</div>

		<div class="flex justify-center">
			<pre bind:this={galaxyElement}>{asciiArt}</pre>
		</div>

		<div class="p-8 rounded-lg">
			<div>
				<label for="alphabet" class="block text-red-500 text-sm font-mono">Alphabet</label>
				<input
					id="alphabet"
					type="text"
					class="block w-full mt-1 bg-black text-red-500 border-red-400 border rounded py-1 px-2 font-mono focus:border-red-500 focus:ring-red-500"
					bind:value={alphabet}
				/>
			</div>

			<div>
				<label for="fps" class="block mt-4 text-red-500 text-sm font-mono">FPS</label>
				<select
					id="fps"
					class="block w-full mt-1 bg-black text-red-500 border-red-400 border rounded py-2 px-4 font-mono focus:border-red-500 focus:ring-red-500"
					bind:value={fps}
				>
					<option value={120}>120 FPS</option>
					<option value={60}>60 FPS</option>
					<option value={30}>30 FPS</option>
					<option value={15}>15 FPS</option>
					<option value={10}>10 FPS</option>
				</select>
			</div>

			<div>
				<label for="speed" class="block mt-4 text-red-500 text-sm font-mono">revolutions</label>
				<select
					id="speed"
					class="block w-full mt-1 bg-black text-red-500 border-red-400 border rounded py-2 px-4 font-mono focus:border-red-500 focus:ring-red-500"
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

<style>
	canvas {
		display: none;
		width: 800px;
		height: 800px;
	}

	pre {
		user-select: none;
		white-space: pre;
		width: 800px;
		height: 800px;
		overflow: hidden;
	}

	input {
		width: 800px;
	}
</style>
