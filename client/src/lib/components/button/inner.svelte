<script lang="ts">
	export let icon: string | undefined;
</script>

<button class="button">
	{#if icon}
		<i class={icon} />
	{/if}
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply rounded px-4 py-2;
		text-decoration: none;
		text-transform: uppercase;
		transition: transform 0.1s;
	}
	.button:hover {
		@apply bg-green-950 text-green-500;
	}
	.button:active {
		@apply bg-green-950 text-green-600;
		transform: translateY(1px);
	}
</style>
