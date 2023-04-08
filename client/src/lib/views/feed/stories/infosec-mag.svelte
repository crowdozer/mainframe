<script lang="ts">
	import type { InfoSecStory } from '../types';
	import Article from './article.svelte';

	export let story: InfoSecStory;
</script>

<Article icon="fa-rss" title={story.title} url={story.link}>
	<span slot="meta" class="contents">
		<span class="text-blue-500">infosec magazine</span> • {new Date(
			story.pubDate
		).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		<p>{story.description}</p>
	</div>
</Article>
