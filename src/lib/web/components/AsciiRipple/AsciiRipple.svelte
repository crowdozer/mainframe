<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { AsciiGenerator } from './ascii';
	import { Ripple } from './ripple';

	// Canvas to draw ripples on
	let canvas: HTMLCanvasElement;
	// Canvas rendering ctx
	let ctx: CanvasRenderingContext2D;
	// Ripples currently animating
	const ripples: Ripple[] = [];
	// How often to spawn a new ripple
	const rippleEvery = 2000;
	// Timer responsible for spawning ripples
	let rippleInterval: NodeJS.Timer;
	// Canvas to ascii generator instance
	let asciiGenerator: AsciiGenerator;
	// Whether or not we're animating
	let animating = false;
	// Target animation fps
	let targetFPS: number = 15;
	// Alphabet for ascii conversion
	let alphabet: string = '    ..-+0101011011';

	/**
	 * Animates current frame and then returns if there should be another
	 */
	function animateFrame(): boolean {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ripples.forEach((ripple, index) => {
			ripple.update();
			ripple.draw();

			if (ripple.alpha <= 0) {
				ripples.splice(index, 1);
			}
		});

		return ripples.length > 0;
	}

	/**
	 * Animates the ripples until none are left to animate
	 */
	function animateRipples() {
		const animationInterval = setInterval(() => {
			const more = animateFrame();

			if (!more) {
				animating = false;
				asciiGenerator.stopRenderingSequence();
				clearInterval(animationInterval);
			}
		}, 1000 / targetFPS);
	}

	/**
	 * Creates a new ripple and begins animation if necessary
	 */
	function createRipple() {
		const x = Math.floor(Math.random() * canvas.width);
		const y = Math.floor(Math.random() * canvas.height);

		ripples.push(new Ripple(x, y, ctx));

		if (!animating) {
			// console.log('animating');
			animating = true;
			animateRipples();
			asciiGenerator.startRenderingSequence(targetFPS);
		}
	}

	function handleResize() {
		asciiGenerator.resize();
	}

	/**
	 * Setup
	 */
	onMount(async () => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		// Instantiate the generator
		asciiGenerator = new AsciiGenerator({
			canvas: canvas,
			alphabet,
			onPerformanceUpdate: (newIPS) => {
				// console.log('IPS: %s', Math.round(newIPS));
			},
		});

		rippleInterval = setInterval(createRipple, rippleEvery);
		window.addEventListener('resize', handleResize);
	});

	/**
	 * Teardown
	 */
	onDestroy(() => {
		asciiGenerator.stopRenderingSequence();
		clearInterval(rippleInterval);
		window.removeEventListener('resize', handleResize);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="container" class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 opacity-50">
	<div class="relative h-full w-full">
		<canvas class="invisible h-full w-full" id="canvas" bind:this={canvas} />
	</div>
</div>

<style lang="postcss">
	#container :global(pre) {
		@apply select-none overflow-hidden whitespace-pre opacity-75;
		/* Gradient setup */
		@apply !box-decoration-clone !bg-clip-text !text-transparent;
		/* Direction */
		@apply !bg-gradient-to-br;
		/* Color Stops */
		@apply !from-primary-500 !via-tertiary-500 !to-secondary-500;

		font-size: 12px !important;
		line-height: calc(10px * 1.2) !important;

		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		/* helpers */
		/* border: 1px solid blue; */
	}
</style>
