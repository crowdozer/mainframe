<!-- crt screen horizontal lines) illusion -->
<div class="crt-screen-container" />

<style lang="postcss">
	/** Draw the screen, including the black border */
	.crt-screen-container {
		position: fixed;
		height: 100vh;
		width: 100%;
		pointer-events: none;
		z-index: 999;
		/** Control the darkness of the crt lines with this*/
		opacity: 0.05;
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
		background: linear-gradient(to bottom, rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 1) 50%);
		background-size: 100% 8px;
		z-index: 998;
		pointer-events: none;
	}
</style>
