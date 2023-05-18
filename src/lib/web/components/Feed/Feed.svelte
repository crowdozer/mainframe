<script lang="ts">
	import HackerNews from './HackerNews.svelte';
	import InfosecMag from './InfosecMag.svelte';
	import KrebsSec from './KrebsSec.svelte';
	import CoinTele from './CoinTele.svelte';
	import type { Feed } from './types';

	export let feed: Feed;

	const { feed: feedItems } = feed;
</script>

<div class="-mx-4 flex flex-col lg:-mx-0 lg:p-4">
	<!-- feed -->
	{#each feedItems as story, index}
		<div
			class="border-b border-t border-secondary-900 px-6 py-12 odd:bg-surface-900 even:bg-surface-800"
		>
			{#if story.kind === 'hacker-news'}
				<HackerNews story={story.data} />
			{/if}

			{#if story.kind === 'infosec-mag'}
				<InfosecMag story={story.data} />
			{/if}

			{#if story.kind === 'krebs-sec'}
				<KrebsSec story={story.data} />
			{/if}

			{#if story.kind === 'coin-tele'}
				<CoinTele story={story.data} />
			{/if}

			<!-- dividers -->
			{#if index < feedItems.length - 1}
				<!-- <hr class="my-8" /> -->
			{/if}
		</div>
	{/each}
</div>
