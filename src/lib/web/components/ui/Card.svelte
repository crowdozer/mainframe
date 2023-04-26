<script lang="ts">
	import Paper from './Paper.svelte';

	export let image: string;
	export let header: string;
	export let subheader: string;
</script>

<div class="card">
	<img src={image} alt={header} />
	<div class="grow px-4 py-2">
		<h4 class="text-lg">{header}</h4>
		{#if subheader}
			<h5 class="text-md text-zinc-400">{subheader}</h5>
		{/if}
	</div>
</div>
