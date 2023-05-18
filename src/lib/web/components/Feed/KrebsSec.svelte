<script lang="ts">
	import type { KrebsStory } from './types';
	import Article from './Article.svelte';

	export let story: KrebsStory;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		<span>krebs on sec</span> • {new Date(story.pubDate).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		<p>{story.description}</p>
	</div>
</Article>
