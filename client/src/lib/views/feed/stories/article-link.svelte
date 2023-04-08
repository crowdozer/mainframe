<script lang="ts">
	export let title: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h1 class="text-md text-gray-300 flex flex-row gap-4" {title}>
		<i class="fas fa-link self-center" />
		<a
			href={url}
			class="text-ellipsis overflow-hidden whitespace-nowrap p-1"
			target="_blank"
			rel="noopener noreferrer">{title}</a
		>
	</h1>

	<!-- author/meta line -->
	<h2 class="text-sm text-gray-500 not-mono lg:pl-10">
		<slot name="meta" />
	</h2>
</article>
