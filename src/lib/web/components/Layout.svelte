<script lang="ts">
	import Navbar from '$web/components/Navbar.svelte';
	import CRT from './CRT.svelte';
	import NavigationProgress from './NavigationProgress.svelte';

	export let showNavbar: boolean = true;
</script>

<NavigationProgress />

<!-- content display -->
<div class="content">
	{#if showNavbar}
		<Navbar />
	{/if}

	<CRT />

	<!-- background image -->
	<div class="bg" />

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
		background: theme(colors.gray.950);
		z-index: 10;
	}

	.content-inner {
		@apply flex flex-1 justify-center px-4;
		z-index: 5;
	}

	.bg {
		overflow: hidden;
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100vh;
		background: linear-gradient(
			195deg,
			theme('colors.emerald.950', darken(50%)) 0%,
			theme(colors.gray.950) 50%
		);
	}
	.bg::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		margin-bottom: -16em;
		height: 16em; /* adjust the height of the fade-out effect */
		box-shadow: 0 0 8em 8em theme(colors.gray.950); /* adjust the shadow properties */
	}
</style>
