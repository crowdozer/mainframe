<script lang="ts">
	import type { HackerNewsStory } from '../types';
	import Article from './article.svelte';

	export let story: HackerNewsStory;

	const icon = story.text ? 'fa-scroll' : story.url ? 'fa-link' : 'fa-exclamation-triangle';
	const title = `(+${story.score.toString()}) ${story.title}`;
</script>

<Article {title} {icon} url={story.url}>
	<span slot="meta" class="contents">
		<span class="text-yellow-500">hacker news</span> • {story.by} • {new Date(
			story.time
		).toLocaleDateString()}
	</span>
	<div slot="content" class="contents">
		{#if story.text}
			{@html story.text}
		{/if}
	</div>
</Article>
