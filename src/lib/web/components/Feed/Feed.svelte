<script lang="ts">
	import Paper from '$web/components/ui/Paper.svelte';
	import HackerNews from './HackerNews.svelte';
	import InfosecMag from './InfosecMag.svelte';
	import KrebsSec from './KrebsSec.svelte';
	import CoinTele from './CoinTele.svelte';
	import type { Feed } from './types';
	import { fromNow } from '$web/utils/dates';

	export let feed: Feed;

	const { feed: feedItems, ISR } = feed;

	let visibleFeedItems = feedItems.slice(0, 10);
	let expanded = false;

	function handleShowMore() {
		visibleFeedItems = feedItems;
		expanded = true;
	}
</script>

<div class="my-4">
	<Paper>
		<div class="mt-8">
			{#each visibleFeedItems as story, index}
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
				{#if index < visibleFeedItems.length - 1}
					<hr class="my-8" />
				{/if}
			{/each}
		</div>
	</Paper>
</div>

{#if !expanded}
	<div class="mb-16 mt-12">
		<button class="btn btn-lg variant-ringed w-full" on:click={handleShowMore}> Load More </button>
	</div>
{/if}

<div class="my-4">
	<p class="text-right">
		<a href="https://news.ycombinator.com/">news.ycombinator.com</a> •
		<a href="https://krebsonsecurity.com/">krebsonsecurity.com</a> •
		<a href="https://cointelegraph.com/">cointelegraph.com</a> •
		<a href="https://www.infosecurity-magazine.com">infosecurity-magazine.com</a>
	</p>
	<br />
	<p class="text-right text-zinc-500" title={feed.generated.toISOString()}>
		<!-- feed compiled in {elapsed.toFixed(2)} seconds • {fromNow(feed.generated)} -->
		feed regenerated {fromNow(feed.generated)}
	</p>
	<p class="text-right text-zinc-500">
		webpage cached <span title={ISR.toISOString()}>{fromNow(ISR)}</span>
	</p>
</div>
