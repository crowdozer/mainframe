<script lang="ts">
	import Inner from './inner.svelte';

	// Icon to display on the button
	export let icon: string | undefined;
	// If this is specified, the button is wrapped in an anchor
	export let link: string | undefined;

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
		<Inner {icon}>
			<slot />
		</Inner>
	</a>
{:else}
	<Inner {icon}>
		<slot />
	</Inner>
{/if}
