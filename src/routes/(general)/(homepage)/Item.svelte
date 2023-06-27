<script lang="ts">
	export let title: string;
	export let link: string;
	export let description: string;
</script>

{#if link}
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		class="border border-stone-800 bg-transparent p-4 hover:border-stone-700 hover:bg-transparent"
	>
		<div class="flex flex-col gap-4">
			<h3 class="text-light font-bold">
				<i class="fa-fw fas fa-link text-sm text-primary-500" />
				{title}
			</h3>
			<p class="text-dark font-sans">{description}</p>
		</div>
	</a>
{:else}
	<div class="rounded border border-stone-700 bg-stone-950 p-4">
		<div class="flex flex-col gap-4">
			<h3 class="text-light font-bold">{title}</h3>
			<p class="text-dark font-sans">{description}</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	a.bg-transparent:hover {
		background: transparent !important;
	}
</style>
