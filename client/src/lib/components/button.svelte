<script lang="ts">
	export let icon: string | undefined;
	export let link: string | undefined;
</script>

{#if link}
	<a href={link} class="button">
		{#if icon}
			<i class={icon} />
		{/if}
		<slot />
	</a>
{:else}
	<button class="button">
		{#if icon}
			<i class={icon} />
		{/if}
		<slot />
	</button>
{/if}

<style lang="postcss">
	.button {
		@apply rounded px-4 py-2 mr-2;
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
