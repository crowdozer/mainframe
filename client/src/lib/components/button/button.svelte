<script lang="ts">
	import Inner from './inner.svelte';
	import { createEventDispatcher } from 'svelte';

	// Icon to display on the button
	export let icon: string | undefined = undefined;
	// If this is specified, the button is wrapped in an anchor
	export let link: string | undefined = undefined;
	// If the button is full width orn ot
	export let fullWidth: boolean = false;
	// How big the button should be
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

	// for dispatching on:click events
	const dispatch = createEventDispatcher();
	function handleClick(event: Event) {
		dispatch('click', event);
	}

	// Define some anchor properties if nescessary
	let target: undefined | '_blank' = undefined;
	let rel: undefined | 'noopener noreferrer' = undefined;
	const isExternalLink = link && link.startsWith('http');
	if (isExternalLink) {
		target = '_blank';
		rel = 'noopener noreferrer';
	}
</script>

{#if link}
	<a href={link} class="contents" {target} {rel}>
		<Inner {icon} {fullWidth} {size} on:click={handleClick}>
			<slot />
		</Inner>
	</a>
{:else}
	<Inner {icon} {fullWidth} {size} on:click={handleClick}>
		<slot />
	</Inner>
{/if}
