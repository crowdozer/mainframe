<script lang="ts">
	import Container from '$web/components/ui/Container.svelte';
	import Feed from '$web/components/Feed/Feed.svelte';
	import type { PageData } from './$types';
	import AsciiRipple from '$web/components/AsciiRipple/AsciiRipple.svelte';
	import { fromNow } from '$web/utils/dates';
	import { toast } from '$web/utils/toast';

	export let data: PageData;

	let FX = true;

	function handleToggleFX() {
		FX = !FX;
		if (FX) {
			toast('FX turned on');
		} else {
			toast('FX turned off');
		}
	}
</script>

<svelte:head>
	<title>rss feeds</title>
</svelte:head>

<Container>
	{#if FX}
		<AsciiRipple />
	{/if}

	<!-- info -->
	<div class="mt-8 p-4 lg:mt-32">
		<p class="text-right">
			<a href="https://news.ycombinator.com/">news.ycombinator.com</a> •
			<a href="https://krebsonsecurity.com/">krebsonsecurity.com</a> •
			<a href="https://cointelegraph.com/">cointelegraph.com</a> •
			<a href="https://www.infosecurity-magazine.com">infosecurity-magazine.com</a>
		</p>
		<p class="text-darker text-right" title={data.generated.toISOString()}>
			generated {fromNow(data.generated)}
			• cached <span title={data.ISR.toISOString()}>{fromNow(data.ISR)}</span>
			•
			<button class="btn btn-sm px-1 py-1 hover:variant-ringed-secondary" on:click={handleToggleFX}>
				toggle FX
			</button>
		</p>
	</div>

	<div class="mt-4 md:mt-16">
		<Feed feed={data} />
	</div>
</Container>
