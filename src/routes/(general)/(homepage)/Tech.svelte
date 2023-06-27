<script lang="ts">
	export let name: string;
	export let icon: string | undefined;
	export let level: 1 | 2 | 3 | 4 | 5;
</script>

<div class="flex flex-row justify-start gap-2 md:justify-end">
	<div class="tech btn">
		{#if icon}
			<i class="text-primary-500 {icon}" />
		{/if}
		{name}
	</div>

	<div data-level={level} class="flex flex-row gap-1">
		{#each Array(level) as _}
			<div class="bubble bubble-filled" />
		{/each}
		{#each Array(5 - level) as _}
			<div class="bubble bubble-empty" />
		{/each}
	</div>
</div>

<style lang="postcss">
	.bubble {
		@apply inline-block h-6 w-6 self-center rounded-full border border-secondary-900-50-token;
	}
	.bubble-filled {
		@apply bg-secondary-700-200-token;
	}
	.bubble-empty {
		@apply bg-transparent;
	}
	.tech {
		@apply inline-block min-w-[130px] rounded border border-stone-700 p-2 text-xl;
	}
</style>
