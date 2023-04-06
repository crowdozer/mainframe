<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Paper from '$lib/components/paper.svelte';
	import Intro from '$lib/components/intro/intro.svelte';
	import type { Data } from './+page';

	export let data: Data;

	const { top10, date, time } = data;
</script>

<Container>
	<!-- Hero section -->
	<div class="my-32">
		<Intro />
	</div>

	<div class="mx-auto mt-64 mb-16 text-center text-2xl">
		<i class="fas fa-chevron-down" />
	</div>

	<div class="my-4">
		<Paper>
			<div class="m-8">
				{#each top10 as story}
					<h1
						class="text-xl mt-4 mb-2 overflow-hidden overflow-ellipsis max-w-full break-all line-clamp-1"
						title={story.title}
					>
						<span class="text-gray-300">
							{#if story.text}
								<i class="fas fa-scroll" />
							{:else if story.url}
								<i class="fas fa-link" />
							{:else}
								<i class="fas fa-exclamation-triangle" />
							{/if}
							{story.score.toString().padStart(3, '0')}
							|
						</span>
						{story.title}
					</h1>
					{#if story.text}
						<div class="story text-justify">
							{@html story.text}
						</div>
					{/if}
					{#if story.url}
						<a
							href={story.url}
							class="overflow-hidden overflow-ellipsis max-w-full line-clamp-1 break-all px-4 py-1"
							>> {story.url}</a
						>
					{/if}
					<hr class="my-4" />
				{/each}
			</div>
		</Paper>
	</div>

	<div class="my-4">
		<p class="text-right">
			via <a href="https://news.ycombinator.com/">news.ycombinator.com</a>
			• generated in {time.toFixed(2)} seconds • {new Date(date).toLocaleDateString()}
		</p>
	</div>
</Container>

<style lang="postcss">
	.story :global(p) {
		@apply my-2;
	}
</style>
