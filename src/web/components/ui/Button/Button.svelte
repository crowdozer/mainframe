<script lang="ts">
	import Inner from './Inner.svelte';
	import Loader from './Loader.svelte';

	// If the button is loading
	export let loading: boolean = false;
	// If the button is disabled
	export let disabled: boolean = false;
	// Icon to display on the button
	export let icon: string | undefined = undefined;
	// If this is specified, the button is wrapped in an anchor
	export let link: string | undefined = undefined;
	// If the button is full width orn ot
	export let fullWidth: boolean = false;
	// How big the button should be
	export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
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
</script>

{#if link}
	<a href={link} class="contents" {target} {rel}>
		<Inner {icon} {fullWidth} {disabled} {size} {type} on:click>
			<Loader {loading}>
				<slot />
			</Loader>
		</Inner>
	</a>
{:else}
	<Inner {icon} {fullWidth} {disabled} {size} {type} on:click>
		<Loader {loading}>
			<slot />
		</Loader>
	</Inner>
{/if}
