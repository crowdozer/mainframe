<script lang="ts">
	import Navbar from '$web/components/navbar.svelte';
	import CRT from './crt.svelte';
</script>


<!-- content display -->
<div class="content">
	<Navbar />

	<CRT />

	<!-- background image -->
	<div class="bg"></div>

	<main class="content-inner">
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
		Content Wrapper  = 10
		Content Inner    = 5
		Background Img   = 1
	*/

	.content {
		@apply relative flex flex-col;
		background: theme(colors.neutral.950);
		z-index: 10;
	}

	.content-inner {
		@apply flex flex-1 justify-center px-4;
		z-index: 5;
	}

	.bg {
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background: linear-gradient(192deg, theme(colors.emerald.950), theme(colors.neutral.950));
	}

	/** A shade to darken the BG gradient further */
	.bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 5, 10, 0.5);
	}
</style>
