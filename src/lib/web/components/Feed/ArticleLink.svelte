<script lang="ts">
	export let title: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h1 class="text-md flex flex-row gap-4 text-gray-300" {title}>
		<i class="fas fa-link self-center" />
		<a
			href={url}
			class="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
			target="_blank"
			rel="noopener noreferrer">{title}</a
		>
	</h1>

	<!-- author/meta line -->
	<h2 class="not-mono text-sm text-gray-500 lg:pl-10">
		<slot name="meta" />
	</h2>
</article>
