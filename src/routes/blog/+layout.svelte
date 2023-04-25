<script>
	import Container from '$web/components/ui/Container.svelte';
	import Paper from '$web/components/ui/Paper.svelte';

	/**
	 * TODO: finish
	 * @see https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
	 */
</script>

<svelte:head>
	<title>Bloggo</title>
</svelte:head>

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
		@apply mb-5 mt-8 text-2xl font-bold;
		text-decoration: dotted;
		text-decoration-line: underline;
		text-underline-offset: 8px;
	}
	.appcontainer :global(h2) {
		@apply mb-4 mt-8 text-xl font-bold;
	}
	.appcontainer :global(h3) {
		@apply mb-4 mt-8 text-lg font-bold;
	}
	.appcontainer :global(hr) {
		@apply mb-4 mt-4 border-gray-300;
		border-width: 2px;
		border-style: dashed;
	}
	.appcontainer :global(p) {
		@apply mb-2;
	}
	.appcontainer :global(ul) {
		@apply mb-4 ml-4 mt-2;
	}
	.appcontainer :global(li) {
		@apply ml-4;
	}
	.appcontainer :global(li > p) {
		display: inline-block;
	}
	.appcontainer :global(input[type='checkbox']) {
		width: 1rem;
		height: 1rem;
	}
</style>
