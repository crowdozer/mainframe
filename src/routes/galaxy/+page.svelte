<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GalaxyGenerator } from './generator';
	import Paper from '$web/components/paper.svelte';
	import Container from '$web/components/container.svelte';
	import { getRandomInt } from '$web/utils/random-int';
	import { measureFPS } from '$web/utils/fps';
	import { roundToNearest } from '$web/utils/custom-round';

	// not mutable, but assigned during startup
	let canvas: HTMLCanvasElement;
	let galaxyElement: HTMLPreElement;
	let generator: GalaxyGenerator;

	// mutable
	let targetFPS: number = 30;
	let targetRPM: number = 2;
	let alphabet: string = ' .-+01';
	let asciiWidth = 0;
	let asciiHeight = 0;
	let asciiArt: string = '';
	let debugIPS = 0;

	// not mutable, but referenced multiple times
	const numStars = 1200;
	const numArms = getRandomInt(1, 3);

	/**
	 * Determines the rotation step.
	 * speed = how many revolutions per minute
	 * fps   = how many rotation steps to apply every second
	 */
	function getRotationStep(): number {
		const totalDegrees = 360 * targetRPM;
		const framesPerMinute = targetFPS * 60;
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
	function setAsciiDimensions() {
		const [charWidth, charHeight] = getCharSize();
		const preWidth = galaxyElement.clientWidth;
		const preHeight = galaxyElement.clientHeight;

		const columns = Math.floor(preWidth / charWidth);
		const rows = Math.floor(preHeight / charHeight);

		asciiWidth = columns;
		asciiHeight = rows;
	}

	/**
	 * Stops the rendering sequence
	 */
	function performShutdown() {
		if (!generator) {
			return;
		}

		generator.stopRenderingSequence();
	}

	/**
	 * Starts the rendering sequence
	 */
	function performStartup() {
		if (!generator) {
			return;
		}

		console.log('starting rendering cycles');
		generator.rotationStep = getRotationStep();
		generator.alphabet = alphabet;
		generator.startRenderingSequence(targetFPS);
	}

	/**
	 * Analyzes the machine's fps capabilities and then sets
	 * a reasonable default value
	 */
	async function setFPS() {
		const capableFPS = await measureFPS();
		targetFPS = roundToNearest(capableFPS, [144, 60, 30]);
	}

	/**
	 * Fixes the height of the galaxyElement such that it's 1:1 ratio
	 */
	function fixAsciiHeight() {
		galaxyElement.style.height = getComputedStyle(galaxyElement).width;
	}

	/**
	 * Performs all required setup operations
	 */
	async function initialize() {
		// Set sim speed
		await setFPS();
		// Force a 1:1 aspect ratio for output
		fixAsciiHeight();
		// Set the dimensions for ascii output
		setAsciiDimensions();
		// Instantiate the generator
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
			onPerformanceUpdate: (newIPS) => {
				debugIPS = Math.round(newIPS);
			}
		});
		// Initialize the generator
		generator.initializeStars();
		performStartup();
	}

	/**
	 * Calls cleanupAndRestart() if a config value requires a reload
	 */
	$: if (targetFPS || targetRPM || alphabet) {
		performShutdown();
		performStartup();
	}

	onMount(async () => {
		await initialize();
	});

	onDestroy(() => {
		// Clear the interval when the component is unmounted
		performShutdown();
	});
</script>

<svelte:head>
	<title>galaxy sim</title>
</svelte:head>

<Container>
	<div class="mb-4">
		<Paper>
			<div>
				<canvas bind:this={canvas} />
			</div>

			<div class="flex justify-center">
				<pre bind:this={galaxyElement}>{asciiArt}</pre>
			</div>

			<div class="rounded p-8">
				<div class="grid grid-cols-2">
					<div class="px-4 py-2 font-bold">sim speed</div>
					<div class="px-4 py-2">
						{#if debugIPS}
							{debugIPS}hz (targ {targetFPS})
						{:else}
							measuring performance...
						{/if}
					</div>
					<div class="px-4 py-2 font-bold">num arms</div>
					<div class="px-4 py-2">
						{numArms}
						{numArms > 1 ? ' arms' : ' arm'}
					</div>
					<div class="px-4 py-2 font-bold">stars</div>
					<div class="px-4 py-2">{numStars}</div>
					<div class="px-4 py-2 font-bold">ascii</div>
					<div class="px-4 py-2">
						{asciiWidth * asciiHeight} ({asciiWidth} x {asciiHeight})
					</div>
				</div>
			</div>

			<div class="p-8">
				<div>
					<label for="alphabet" class="mt-4 block text-sm">alphabet</label>
					<input
						id="alphabet"
						type="text"
						class="mt-1 block w-full rounded border border-dashed bg-black px-4 py-2"
						bind:value={alphabet}
					/>
				</div>

				<div>
					<label for="fps" class="mt-4 block text-sm">Target FPS</label>
					<select
						id="fps"
						class="mt-1 block w-full rounded border border-dashed bg-black px-4 py-2"
						bind:value={targetFPS}
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
					<label for="speed" class="mt-4 block text-sm">revolutions</label>
					<select
						id="speed"
						class="mt-1 block w-full rounded border border-dashed bg-black px-4 py-2"
						bind:value={targetRPM}
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
		@apply w-full select-none overflow-hidden whitespace-pre;
		font-size: 10px;
		line-height: calc(10px * 1.2);
	}
</style>
