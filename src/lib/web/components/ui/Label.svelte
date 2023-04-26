<script lang="ts">
	export let kind: 'success' | 'warning' | 'primary' | 'error' = 'primary';
	export let outlined: boolean = true;

	const style = outlined ? 'ringed' : 'soft';

	const variant = `variant-${style}-${kind}`;
</script>

<span class="badge {variant}">
	<slot />
</span>
