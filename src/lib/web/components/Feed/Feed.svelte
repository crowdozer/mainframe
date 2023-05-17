<script lang="ts">
	import HackerNews from './HackerNews.svelte';
	import InfosecMag from './InfosecMag.svelte';
	import KrebsSec from './KrebsSec.svelte';
	import CoinTele from './CoinTele.svelte';
	import type { Feed } from './types';
	import { fromNow } from '$web/utils/dates';

	export let feed: Feed;

	const { feed: feedItems, ISR } = feed;
</script>

<div class="flex flex-col gap-8">
	<!-- info -->
	<div class="my-8 p-4 md:my-16">
		<p class="text-right">
			<a href="https://news.ycombinator.com/">news.ycombinator.com</a> •
			<a href="https://krebsonsecurity.com/">krebsonsecurity.com</a> •
			<a href="https://cointelegraph.com/">cointelegraph.com</a> •
			<a href="https://www.infosecurity-magazine.com">infosecurity-magazine.com</a>
		</p>
		<p class="text-right text-zinc-500" title={feed.generated.toISOString()}>
			generated {fromNow(feed.generated)}
			• cached <span title={ISR.toISOString()}>{fromNow(ISR)}</span>
		</p>
	</div>

	<!-- feed -->
	<div class="p-4">
		{#each feedItems as story, index}
			{#if story.kind === 'hacker-news'}
				<HackerNews story={story.data} />
			{/if}

			{#if story.kind === 'infosec-mag'}
				<InfosecMag story={story.data} color={story.color} />
			{/if}

			{#if story.kind === 'krebs-sec'}
				<KrebsSec story={story.data} color={story.color} />
			{/if}

			{#if story.kind === 'coin-tele'}
				<CoinTele story={story.data} color={story.color} />
			{/if}

			<!-- dividers -->
			{#if index < feedItems.length - 1}
				<hr class="my-8" />
			{/if}
		{/each}
	</div>
</div>
