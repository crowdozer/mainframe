<!-- crt screen (bezel + horizontal lines) + scanline -->
<div class="crt-screen-container">
	<div class="scanline" />
</div>

<style lang="postcss">
	/** Draw the screen, including the black border */
	.crt-screen-container {
		position: fixed;
		height: 100vh;
		width: 100%;
		pointer-events: none;
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
</style>
