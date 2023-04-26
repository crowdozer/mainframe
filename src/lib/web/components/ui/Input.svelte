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

<div class="form-control w-full {widthClass}">
	{#if label}
		<label for="input-{name}" class="label">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		id="input-{name}"
		type="text"
		class="input-bordered input-ghost input w-full {widthClass}"
		{name}
		{placeholder}
		{readonly}
		{disabled}
		bind:value
		on:change
	/>
</div>
