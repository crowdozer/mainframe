<script lang="ts">
	import HackerNews from './HackerNews.svelte';
	import InfosecMag from './InfosecMag.svelte';
	import KrebsSec from './KrebsSec.svelte';
	import CoinTele from './CoinTele.svelte';
	import type { Feed } from './types';

	export let feed: Feed;

	const { feed: feedItems } = feed;
</script>

<div class="flex flex-col gap-8">
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
