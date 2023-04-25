<script lang="ts">
	import type { CoinTeleStory } from './types';
	import Article from './Article.svelte';

	export let story: CoinTeleStory;
	export let color: string;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		via <span style="color: {color}">coin telegraph</span> • {new Date(
			story.pubDate
		).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		{@html story.description}
	</div>
</Article>
