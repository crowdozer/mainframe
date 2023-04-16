<script lang="ts">
	export let name: string;
	export let value: any;
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
		class="{widthClass} border border-gray-600 bg-transparent p-2 disabled:border-gray-700"
		id="input-{name}"
		{name}
		bind:value
		on:change
		{placeholder}
		{readonly}
		{disabled}
	/>
</div>
