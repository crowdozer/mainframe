<script lang="ts">
	// import Paper from './Paper.svelte';

	export let image: string;
	export let header: string;
	export let subheader: string;
</script>

<!-- <div class="max-w-md overflow-hidden rounded-xl border border-dashed border-zinc-600">
	<Paper>
		<div class="flex flex-col">
			<div />
			<div class="grow px-4 py-2">
				<h3 class="text-lg">{header}</h3>
				{#if subheader}
					<h3 class="text-md text-zinc-400">{subheader}</h3>
				{/if}
			</div>
		</div>
	</Paper>
</div> -->

<div class="card image-full w-96 bg-base-100 shadow-xl">
	<figure>
		<img src={image} alt={header} />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{header}</h2>
		{#if subheader}
			<p>{subheader}</p>
		{/if}
	</div>
</div>
