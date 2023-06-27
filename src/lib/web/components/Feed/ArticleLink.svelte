<script lang="ts">
	export let title: string = '';
	export let url: string | undefined = undefined;
</script>

<article class="flex flex-col gap-1">
	<!-- header line -->
	<h5 class="text-md flex flex-row gap-4" {title}>
		<i class="fas fa-link self-center" />
		<a
			href={url}
			class="overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1"
			target="_blank"
			rel="noopener noreferrer">{title}</a
		>
	</h5>

	<!-- author/meta line -->
	<p class="text-darker text-sm italic lg:pl-12">
		<slot name="meta" />
	</p>
</article>
