<script lang="ts">
	import { onMount } from 'svelte';
	import { GalaxyGenerator } from './generator';
	import Paper from '$lib/components/paper.svelte';
	import Container from '$lib/components/container.svelte';
	import { getRandomInt } from '$lib/utils/random-int';
	import { sleep } from '$lib/utils/sleep';

	/**
	 * Galaxy generation is adapted from this:
	 * https://www.reddit.com/r/gamedev/comments/20ach8/how_to_generate_star_positions_in_a_2d_procedural/
	 */

	let cleanup: (() => void) | null = null;

	let canvas: HTMLCanvasElement;
	let galaxyElement: HTMLPreElement;
	let generator: GalaxyGenerator;
	let fps: number = 300;
	let alphabet: string = ' .-+01';
	let speed: number = 2;
	const numStars = 1200;
	const numArms = getRandomInt(1, 3);
	let asciiWidth = 0;
	let asciiHeight = 0;

	// Stores the ascii output
	let asciiArt: string = '';

	// Stores debug output
	let asciiIPS = 0;
	let drawStarsIPS = 0;
	let rotationIPS = 0;

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

	/**
	 * Determines the char width/height
	 */
	function getCharSize(): [number, number] {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.font = "10px 'Consolas'";

		const charWidth = ctx.measureText('M').width;
		const charHeight = 10 * 1.2; // Assuming line-height is 1.2 times the font size

		return [charWidth, charHeight];
	}

	/**
	 * Determines and saves the dimensions of the ascii renderer
	 */
	function setDimensions() {
		const [charWidth, charHeight] = getCharSize();
		const preWidth = galaxyElement.clientWidth;
		const preHeight = galaxyElement.clientHeight;

		const columns = Math.floor(preWidth / charWidth);
		const rows = Math.floor(preHeight / charHeight);

		asciiWidth = columns;
		asciiHeight = rows;
	}

	// Starts and restarts the galaxy sequence automatically
	// Also handles cleanup of intervals on unmount
	$: if (fps || speed || alphabet) {
		if (cleanup) {
			console.log('stopping rendering cycles');
			cleanup();
		}

		if (generator) {
			console.log('restarting rendering cycles');
			generator.rotationStep = getRotationStep();
			generator.alphabet = alphabet;
			cleanup = generator.beginIntervals(fps);
		}
	}

	onMount(async () => {
		await sleep(150);

		// Force a 1:1 aspect ratio
		galaxyElement.style.height = getComputedStyle(galaxyElement).width;

		// Set the dimensions
		setDimensions();

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
			onNewFrame: (ascii) => {
				asciiArt = ascii;
			},
			onPerformanceUpdate: (newAsciiIPS, newDrawStarsIPS, newRotationIPS) => {
				asciiIPS = Math.round(newAsciiIPS);
				drawStarsIPS = Math.round(newDrawStarsIPS);
				rotationIPS = Math.round(newRotationIPS);
			}
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

			<div class="text-center p-8">
				{#if asciiIPS && drawStarsIPS && rotationIPS}
					invocations/sec (starmap|rotation|ascii): {drawStarsIPS}|{rotationIPS}|{asciiIPS}
				{:else}
					measuring performance...
				{/if}
			</div>

			<div class="p-8 rounded-lg">
				<div>
					<label for="alphabet" class="block text-sm font-mono">alphabet</label>
					<input
						id="alphabet"
						type="text"
						class="block w-full mt-1 bg-black border rounded py-1 px-2 font-mono"
						bind:value={alphabet}
					/>
				</div>

				<div>
					<label for="fps" class="block mt-4 text-sm font-mono">FPS limit</label>
					<select
						id="fps"
						class="block w-full mt-1 bg-black border rounded py-2 px-4 font-mono"
						bind:value={fps}
					>
						<option value={300}>300 FPS</option>
						<option value={240}>240 FPS</option>
						<option value={165}>165 FPS</option>
						<option value={144}>144 FPS</option>
						<option value={60}>60 FPS</option>
						<option value={30}>30 FPS</option>
						<option value={20}>20 FPS</option>
						<option value={15}>15 FPS</option>
						<option value={10}>10 FPS</option>
					</select>
				</div>

				<div>
					<label for="speed" class="block mt-4 text-sm font-mono">revolutions</label>
					<select
						id="speed"
						class="block w-full mt-1 bg-black border rounded py-2 px-4 font-mono"
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
		@apply w-full select-none whitespace-pre overflow-hidden;
		font-size: 10px;
		line-height: calc(10px * 1.2);
	}
</style>
