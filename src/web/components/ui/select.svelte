<script lang="ts">
	export let name: string;
	export let defaultValue: string = ''
	export let value: string = defaultValue;
	export let label: string | undefined = '';
	export let fullWidth: boolean = true;
	export let disabled: boolean = false;

	let widthClass = fullWidth ? 'w-full' : '';
</script>

<div>
	{#if label}
		<label class="block pb-1 text-sm" for="input-{name}">{label}</label>
	{/if}

	<select class={widthClass} id="select-{name}" {name} bind:value on:change {disabled}>
		<slot />
	</select>
</div>

<style lang="postcss">
	select {
		@apply border border-dashed bg-transparent p-2 disabled:opacity-75;
		border-color: var(--contrast-soft);
	}

	select > option {
		@apply bg-transparent p-2;
	}
</style>
