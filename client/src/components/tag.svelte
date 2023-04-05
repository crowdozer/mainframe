<script lang="ts">
	export let open: boolean = false;
	export let text: string = 'p';
	export let color: string = 'var(--alt-text-color)';

	const display = `<${!open ? '/' : ''}${text}>`;
</script>

<span style="color: {color}; opacity: 0.25; font-size: .85em; user-select: none">
	{display}
</span>
