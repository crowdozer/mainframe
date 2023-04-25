<script lang="ts">
	import Paper from './paper.svelte';

	export let image: string;
	export let header: string;
	export let subheader: string;
</script>

<div class="max-w-md overflow-hidden rounded-xl border border-dashed border-gray-600">
	<Paper>
		<div class="flex flex-col">
			<div>
				<img src={image} alt={header} />
			</div>
			<div class="grow px-4 py-2">
				<h3 class="text-lg">{header}</h3>
				{#if subheader}
					<h3 class="text-md text-gray-400">{subheader}</h3>
				{/if}
			</div>
		</div>
	</Paper>
</div>
