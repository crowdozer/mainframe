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
		class="rounded border border-stone-700 bg-stone-950 p-4 hover:bg-stone-900"
	>
		<div class="flex flex-col gap-4">
			<h3 class="font-bold text-stone-100">
				<i class="fa-fw fas fa-link text-sm text-primary-500" />
				{title}
			</h3>
			<p class="font-sans text-stone-400">{description}</p>
		</div>
	</a>
{:else}
	<div class="rounded border border-stone-700 bg-stone-950 p-4">
		<div class="flex flex-col gap-4">
			<h3 class="font-bold text-stone-100">{title}</h3>
			<p class="font-sans text-stone-400">{description}</p>
		</div>
	</div>
{/if}

<style lang="postcss">
	a:hover {
		@apply bg-stone-900 !important;
	}
</style>
