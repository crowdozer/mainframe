<script lang="ts">
	export let title: string = '';
	export let icon: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h3 class="overflow-hidden text-ellipsis whitespace-nowrap text-xl" {title}>
		<i class="fas {icon} self-center" />
		<span class="ml-2">
			{@html title}
		</span>
	</h3>

	<!-- author/meta line -->
	<p class="text-darker mb-6 text-sm italic lg:pl-12">
		<slot name="meta" />
	</p>

	<!-- story content -->
	<div class="story break-words lg:pl-12" style="word-break:break-word;">
		<slot name="content" />
	</div>

	<!-- story URL -->
	{#if url}
		<a
			href={url}
			class=" overflow-hidden text-ellipsis whitespace-nowrap p-2 lg:ml-10"
			target="_blank"
			rel="noopener noreferrer"
		>
			{url}
		</a>
	{/if}
</article>

<style lang="postcss">
	.story :global(p) {
		@apply my-2;
	}
</style>
