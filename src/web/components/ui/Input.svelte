<script lang="ts">
	export let name: string;
	export let defaultValue: any = '';
	export let value: any = defaultValue;
	export let label: string | undefined = '';
	export let readonly: boolean = false;
	export let fullWidth: boolean = true;
	export let disabled: boolean = false;
	export let placeholder: string = '';

	let widthClass = fullWidth ? 'w-full' : '';
</script>

<div>
	{#if label}
		<label class="block pb-1 text-sm" for="input-{name}">{label}</label>
	{/if}
	<input
		class={widthClass}
		id="input-{name}"
		{name}
		bind:value
		on:change
		{placeholder}
		{readonly}
		{disabled}
	/>
</div>

<style lang="postcss">
	input {
		@apply border border-dashed bg-transparent p-2 disabled:opacity-75;
		border-color: var(--contrast-soft);
	}
</style>
