<script>
	import Navbar from '$lib/components/navbar.svelte';
</script>

<!-- crt screen (bezel + horizontal lines) + scanline -->
<div class="fixed top-0 left-0 bottom-0 right-0 pointer-events-none z-51 crt-screen-container">
	<div class="scanline" />
</div>

<!-- background image -->
<div class="fixed h-screen w-screen bg" />

<!-- content display -->
<div class="relative flex flex-col h-screen overflow-auto content">
	<Navbar />

	<div class="flex-1 flex justify-center">
		<slot />
	</div>
</div>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	@import '../styles.css';

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
		background-image: url(bg.webp);
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
		background-color: rgba(0, 0, 0, 0.85);
	}

	/** Draw the screen, including the black border */
	.crt-screen-container {
		box-shadow: inset 1px 1px 100px black;
		animation: bezel 2s linear infinite;
		z-index: 999;
	}

	/** Draw the horizontal lines */
	.crt-screen-container:before {
		content: ' ';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(to bottom, rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%);
		background-size: 100% 8px;
		z-index: 998;
		pointer-events: none;
	}

	/** Draw the scanline */
	.scanline {
		width: 100%;
		height: 100px;
		z-index: 997;
		background: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(255, 255, 255, 0.4) 10%,
			rgba(0, 0, 0, 0.2) 100%
		);
		opacity: 0.1;
		position: absolute;
		bottom: 100%;
		animation: scanline 5s linear infinite;
	}

	.content {
		z-index: 10;
	}
</style>
