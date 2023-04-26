<script lang="ts">
	// If the button is loading
	export let loading: boolean = false;

	// If the button is disabled
	export let disabled: boolean = false;

	// Icon to display on the button
	export let icon: string | undefined = undefined;

	// If this is specified, the button is wrapped in an anchor
	export let link: string | undefined = undefined;

	// If the button is full width or not
	export let fullWidth: boolean = false;

	// How big the button should be
	export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

	// What button type to use
	export let type: 'button' | 'submit' | 'reset' = 'button';

	// Define some anchor properties if nescessary
	let target: undefined | '_blank' = undefined;
	let rel: undefined | 'noopener noreferrer' = undefined;
	const isExternalLink = link && link.startsWith('http');
	if (isExternalLink) {
		target = '_blank';
		rel = 'noopener noreferrer';
	}

	const classes = `btn-ghost btn text-${size} ${loading && 'loading'} ${fullWidth && 'btn-block'}`;

	const iconClasses = `${icon} text-${size} mr-3`;
</script>

{#if link}
	<a href={link} {rel} {target} class={classes} on:click>
		{#if icon}
			<i class={iconClasses} />
		{/if}
		<slot />
	</a>
{:else}
	<button {type} class={classes} {disabled} on:click>
		{#if icon}
			<i class={iconClasses} />
		{/if}
		<slot />
	</button>
{/if}
