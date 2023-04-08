<script lang="ts">
	import type { ThreatPostStory } from '../types';
	import Article from './article.svelte';

	export let story: ThreatPostStory;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		<span class="text-red-500">threat post</span> • {new Date(story.pubDate).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		<p>{story.description}</p>
	</div>
</Article>
