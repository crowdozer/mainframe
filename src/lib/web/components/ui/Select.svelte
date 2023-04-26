<script lang="ts">
	export let name: string;
	export let defaultValue: any = '';
	export let value: any = defaultValue;
	export let label: string | undefined = '';
	export let fullWidth: boolean = true;
	export let disabled: boolean = false;

	let widthClass = fullWidth ? '' : 'max-w-lg';
</script>

<div class="form-control w-full {widthClass}">
	{#if label}
		<label for="select-{name}" class="label">
			<span class="label-text">{label}}</span>
		</label>
	{/if}
	<select
		id="select-{name}"
		class="select-bordered select-ghost select"
		{name}
		bind:value
		on:change
		{disabled}
	>
		<slot />
	</select>
</div>
