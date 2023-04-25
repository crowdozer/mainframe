<script lang="ts">
	export let disabled: boolean;
	export let icon: string | undefined;
	export let fullWidth: boolean;
	export let type: 'button' | 'submit' | 'reset';
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	// for any additional styling based on config opts
	let addtlClasses = '';

	if (fullWidth) {
		addtlClasses += ' w-full';
	}

	switch (size) {
		case 'xs':
			addtlClasses += ' px-2 py-1 text-xs';
			break;
		case 'sm':
			addtlClasses += ' px-2 py-1 text-sm';
			break;
		case 'md':
			addtlClasses += ' px-4 py-2 text-md';
			break;
		case 'lg':
			addtlClasses += ' px-8 py-4 text-lg';
			break;
		case 'xl':
			addtlClasses += ' px-16 py-8 text-xl';
			break;
	}
</script>

<button class="button {addtlClasses}" {disabled} {type} on:click>
	{#if icon}
		<i class={icon} />
	{/if}
	<slot />
</button>

<style lang="postcss">
	.button {
		@apply rounded;
		text-decoration: none;
		text-transform: uppercase;
		transition: transform 0.1s;
	}
	.button:hover {
		background: rgba(255, 255, 255, 0.05);
		color: var(--link);
	}
	.button:active {
		background: rgba(255, 255, 255, 0.05);
		color: var(--link-em);
		transform: translateY(1px);
	}
</style>
