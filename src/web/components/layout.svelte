<script lang="ts">
	import Navbar from '$web/components/navbar.svelte';
	import CRT from './crt.svelte';
</script>

<!-- content display -->
<div class="content relative flex flex-col">
	<Navbar />

	<CRT />

	<main class="flex flex-1 justify-center px-4">
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

	.content {
		z-index: 10;
	}
</style>
