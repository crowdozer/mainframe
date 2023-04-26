<script lang="ts">
	export let name: string;
	export let defaultValue: any = '';
	export let value: any = defaultValue;
	export let label: string | undefined = '';
	export let fullWidth: boolean = true;
	export let disabled: boolean = false;

	let widthClass = fullWidth ? '' : 'max-w-lg';
</script>

<label for="select-{name}" class="label w-full {widthClass}">
	{#if label}
		<span>{label}}</span>
	{/if}
	<select id="select-{name}" class="select" {name} bind:value on:change {disabled}>
		<slot />
	</select>
</label>
