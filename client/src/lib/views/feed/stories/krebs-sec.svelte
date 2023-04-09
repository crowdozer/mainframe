<script lang="ts">
	import type { KrebsStory } from '../types';
	import Article from './article.svelte';

	export let story: KrebsStory;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		via <span class="text-red-500">krebs on sec</span> • {new Date(
			story.pubDate
		).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		<p>{story.description}</p>
	</div>
</Article>
