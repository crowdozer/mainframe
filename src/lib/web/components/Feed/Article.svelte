<script lang="ts">
	export let title: string = '';
	export let icon: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h1 class="overflow-hidden text-ellipsis whitespace-nowrap text-xl" {title}>
		<i class="fas {icon} self-center" />
		<span class="ml-2">
			{@html title}
		</span>
	</h1>

	<!-- author/meta line -->
	<h2 class="not-mono mb-6 text-sm text-gray-500 lg:pl-10">
		<slot name="meta" />
	</h2>

	<!-- story content -->
	<div class="story not-mono break-words lg:pl-10" style="word-break:break-word;">
		<slot name="content" />
	</div>

	<!-- story URL -->
	{#if url}
		<div class="ml-10 flex flex-row gap-1">
			<span class="self-center"> read more > </span>
			<a
				href={url}
				class="grow overflow-hidden text-ellipsis whitespace-nowrap p-2"
				target="_blank"
				rel="noopener
		noreferrer">{url}</a
			>
		</div>
	{/if}
</article>

<style lang="postcss">
	.story :global(p) {
		@apply my-2;
	}
</style>
