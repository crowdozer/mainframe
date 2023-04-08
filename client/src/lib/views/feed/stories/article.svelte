<script lang="ts">
	export let title: string = '';
	export let icon: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h1 class="text-xl text-ellipsis whitespace-nowrap overflow-hidden" {title}>
		<span class="text-gray-300">
			<i class="fas {icon} self-center" />
			<span class="ml-2">
				{@html title}
			</span>
		</span>
	</h1>

	<!-- author/meta line -->
	<h2 class="text-sm text-gray-500 not-mono mb-6 lg:pl-10">
		<slot name="meta" />
	</h2>

	<!-- story content -->
	<div class="story not-mono break-words lg:pl-10" style="word-break:break-word;">
		<slot name="content" />
	</div>

	<!-- story URL -->
	{#if url}
		<a
			href={url}
			class="text-ellipsis whitespace-nowrap overflow-hidden pr-4 py-2 lg:pl-10"
			target="_blank"
			rel="noopener noreferrer">read more > {url}</a
		>
	{/if}
</article>

<style lang="postcss">
	article {
		/* background: theme(colors.stone.500); */
	}
	.story :global(p) {
		@apply my-2;
	}
</style>
