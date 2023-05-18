<script lang="ts">
	import type { HackerNewsStory } from './types';
	import ArticleLink from './ArticleLink.svelte';
	import Article from './Article.svelte';

	export let story: HackerNewsStory;

	const icon = story.text ? 'fa-scroll' : story.url ? 'fa-link' : 'fa-exclamation-triangle';
	const title = story.title;
</script>

{#if story.url && !story.text}
	<ArticleLink {title} url={story.url}>
		<span slot="meta" class="contents">
			{story.by} @ hackernews • {new Date(story.time).toLocaleDateString()}
		</span>
	</ArticleLink>
{:else}
	<Article {title} {icon} url={story.url}>
		<span slot="meta" class="contents">
			hackernews • {story.by} • {new Date(story.time).toLocaleDateString()}
		</span>
		<div slot="content" class="contents">
			{#if story.text}
				{@html story.text}
			{/if}
		</div>
	</Article>
{/if}
