<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { crt as showCRT } from '$lib/stores/crt';
	import CRT from './crt.svelte';
</script>

{#if $showCRT}
	<!-- crt screen (bezel + horizontal lines) + scanline -->
	<CRT />
{/if}

<!-- background image -->
<div class="fixed h-screen w-screen bg" />

<!-- content display -->
<div class="relative flex flex-col content">
	<Navbar />

	<main class="flex-1 flex justify-center">
		<slot />
	</main>
</div>

<style lang="postcss">
	/**
		Z Indexing 
		----------------------
		Screen border    = 999
		Horizontal lines = 998 
		Scanline         = 997
		Content          = 10
		Background Img   = 1
	*/

	/** Background image */
	.bg {
		background-image: url(/images/bg.webp);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		z-index: 1;
	}

	.bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.625);
	}

	.content {
		z-index: 10;
	}
</style>
