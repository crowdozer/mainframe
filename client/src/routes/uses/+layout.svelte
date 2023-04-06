<script>
	import Container from '$lib/components/container.svelte';
	import Paper from '$lib/components/paper.svelte';

	/**
	 * TODO: finish
	 * @see https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
	 */
</script>

<Container>
	<Paper>
		<div class="appcontainer">
			<slot />
		</div>
	</Paper>
</Container>

<style lang="postcss">
	.appcontainer {
		@apply p-8;
	}
	.appcontainer :global(h1) {
		@apply text-2xl font-bold mt-8 mb-5;
		text-decoration: dotted;
		text-decoration-line: underline;
		text-underline-offset: 8px;
	}
	.appcontainer :global(h2) {
		@apply text-xl font-bold mt-8 mb-4;
	}
	.appcontainer :global(h3) {
		@apply text-lg font-bold mt-8 mb-4;
	}
	.appcontainer :global(hr) {
		@apply border-gray-300 mt-4 mb-4;
		border-width: 2px;
		border-style: dashed;
	}
	.appcontainer :global(p) {
		@apply mb-2;
	}
	.appcontainer :global(ul) {
		@apply ml-4 mt-2 mb-4;
	}
	.appcontainer :global(li) {
		@apply ml-4;
	}
</style>
