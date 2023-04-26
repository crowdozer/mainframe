<script lang="ts">
	export let name: string;
	export let defaultValue: any = '';
	export let value: any = defaultValue;
	export let label: string | undefined = '';
	export let readonly: boolean = false;
	export let fullWidth: boolean = true;
	export let disabled: boolean = false;
	export let placeholder: string = '';

	let widthClass = fullWidth ? '' : 'max-w-lg';
</script>

<label for="input-{name}" class="label w-full {widthClass}">
	{#if label}
		<span>{label}</span>
	{/if}
	<input
		id="input-{name}"
		type="text"
		class="input"
		{name}
		{placeholder}
		{readonly}
		{disabled}
		bind:value
		on:change
	/>
</label>