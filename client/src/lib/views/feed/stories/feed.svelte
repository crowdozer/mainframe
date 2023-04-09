<script lang="ts">
	import Paper from '$lib/components/paper.svelte';
	import HackerNews from './hacker-news.svelte';
	import InfosecMag from './infosec-mag.svelte';
	import type { Feed } from '../types';
	import KrebsSec from './krebs-sec.svelte';
	import CoinTele from './coin-tele.svelte';

	export let feed: Feed;

	const { date, time, feed: feedItems } = feed;
</script>

<div class="my-4">
	<Paper>
		<div class="m-8">
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
					<hr class="mt-4 mb-4 opacity-25" />
				{/if}
			{/each}
		</div>
	</Paper>
</div>

<div class="my-4">
	<p class="text-right" title={date.toISOString()}>
		<a href="https://news.ycombinator.com/">news.ycombinator.com</a> •
		<a href="https://krebsonsecurity.com/">krebsonsecurity.com</a> •
		<a href="https://cointelegraph.com/">cointelegraph.com</a> •
		<a href="https://www.infosecurity-magazine.com">infosecurity-magazine.com</a>
	</p>
	<p class="text-right" title={date.toISOString()}>
		generated in {time.toFixed(2)} seconds • {date.toLocaleDateString()}
	</p>
</div>
