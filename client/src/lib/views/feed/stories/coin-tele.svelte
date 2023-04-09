<script lang="ts">
	import type { CoinTeleStory } from '../types';
	import Article from './article.svelte';

	export let story: CoinTeleStory;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		via <span class="text-green-500">coin telegraph</span> • {new Date(
			story.pubDate
		).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		{@html story.description}
	</div>
</Article>
