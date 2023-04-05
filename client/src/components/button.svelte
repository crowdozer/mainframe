<script lang="ts">
	export let icon: string | undefined;
	export let link: string | undefined;
</script>

{#if link}
	<a href={link} class="bg-black hover-bg rounded px-4 py-2 mr-2">
		{#if icon}
			<i class="{icon} text-color-main-text" />
		{/if}
		<slot />
	</a>
{:else}
	<button class="bg-black hover-bg rounded px-4 py-2 mr-2">
		{#if icon}
			<i class="{icon} text-color-main-text" />
		{/if}
		<slot />
	</button>
{/if}

<style>
	a,
	button {
		text-decoration: none;
		transition: transform 0.1s;
	}
	a:active,
	button:active {
		transform: translateY(1px);
	}
	.text-color-main-text {
		color: var(--main-text-color);
	}
	.hover-bg:hover {
		background: var(--main-text-color);
		color: var(--main-background-color);
	}
	.hover-bg:hover > i {
		color: var(--main-background-color);
	}
	button {
		text-transform: uppercase;
	}
</style>
