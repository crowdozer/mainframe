<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { AsciiGenerator } from './ascii';
	import { Ripple } from './ripple';
	import { getRandomInt } from '$web/utils/random-int';

	// Canvas to draw ripples on
	let canvas: HTMLCanvasElement;
	// Canvas rendering ctx
	let ctx: CanvasRenderingContext2D;
	// Ripples currently animating
	const ripples: Ripple[] = [];
	// How often to spawn a new ripple
	const rippleEvery = 2500;
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
	// How fast do the rings decay
	const decay = 0.05 / targetFPS;
	// Random decay multipliers
	const decayMinCoef = 1;
	const decayMaxCoef = 3;
	// Propagation speed
	const propagation = 20 / targetFPS;
	// Prevent spam
	const maxRipples = 3;

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
			// if we're not animating anymore, cleanup
			if (!animating) {
				asciiGenerator.stopRenderingSequence();
				clearInterval(animationInterval);
				return;
			}

			// animate the current frame, and get whether or not another
			// animation frame is necessary
			const ripplesNeedAnimating = animateFrame();
			if (!ripplesNeedAnimating) {
				// we'll cleanup on next frame
				animating = false;
			}
		}, 1000 / targetFPS);
	}

	/**
	 * Creates a new ripple and begins animation if necessary
	 */
	function createRipple() {
		// prevent ripple spam
		if (ripples.length >= maxRipples) {
			return;
		}

		const x = Math.floor(Math.random() * canvas.width);
		const y = Math.floor(Math.random() * canvas.height);

		const randomDecay = decay * getRandomInt(decayMinCoef, decayMaxCoef);
		ripples.push(new Ripple(x, y, ctx, randomDecay, propagation));

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
		ctx = canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;

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
		animating = false;
		asciiGenerator.stopRenderingSequence();
		clearInterval(rippleInterval);
		window.removeEventListener('resize', handleResize);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="container" class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 select-none">
	<div class="relative h-full w-full">
		<canvas class="invisible h-full w-full" id="canvas" bind:this={canvas} />
	</div>
</div>

<style lang="postcss">
	#container :global(pre) {
		@apply overflow-hidden whitespace-pre;
		/* Gradient setup */
		@apply !box-decoration-clone !bg-clip-text !text-transparent;
		/* Direction */
		@apply !bg-gradient-to-br;
		/* Color Stops */
		@apply !from-primary-500 !via-tertiary-500 !to-secondary-500;

		font-size: 12px !important;
		line-height: calc(10px * 1.2) !important;

		z-index: -1;

		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
</style>
