<script>
	import Container from '$web/components/ui/Container.svelte';
	import Paper from '$web/components/ui/Paper.svelte';

	/**
	 * TODO: finish
	 * @see https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog#approach-2-dynamic-routes
	 */
</script>

<svelte:head>
	<title>blog</title>
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
		@apply p-8 text-stone-100;
	}
	.appcontainer :global(h1) {
		@apply mb-5 mt-8 text-2xl;
	}
	.appcontainer :global(h2) {
		@apply mb-4 mt-8 text-xl;
	}
	.appcontainer :global(h3) {
		@apply mb-4 mt-8 text-lg;
	}
	.appcontainer :global(hr) {
		@apply mb-4 mt-4 border-stone-300;
		border-width: 2px;
		border-style: dashed;
	}
	.appcontainer :global(p) {
		@apply mb-2;
	}
	.appcontainer :global(ul) {
		@apply mb-4 ml-4 mt-2;
		list-style-type: none;
	}
	.appcontainer :global(li) {
		@apply ml-4 mt-2;
	}
	.appcontainer :global(li):before {
		@apply mr-3 text-stone-400;
		content: '\f054'; /* unicode for chevron symbol */
		font-family: FontAwesome; /* font that contains the chevron symbol */
		font-size: 0.65rem;
	}
	.appcontainer :global(li > p) {
		display: inline-block;
	}
	.appcontainer :global(input[type='checkbox']) {
		width: 1rem;
		height: 1rem;
	}
</style>
