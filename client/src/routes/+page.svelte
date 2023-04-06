<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Paper from '$lib/components/paper.svelte';
	import Intro from '$lib/components/intro/intro.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { top10, time } = data;
	const date = new Date(data.date);
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
				{#each top10 as story, index}
					<article>
						<h1
							class="text-xl mt-4 mb-1 overflow-hidden overflow-ellipsis max-w-full break-all line-clamp-1"
							title={story.title}
						>
							<span class="text-gray-300">
								{#if story.text}
									<i class="fas fa-scroll self-center" />
								{:else if story.url}
									<i class="fas fa-link self-center" />
								{:else}
									<i class="fas fa-exclamation-triangle self-center" />
								{/if}
								<span class="ml-2">
									{story.title}
								</span>
							</span>
						</h1>
						<h2 class="text-sm mt-1 mb-4 text-gray-500 not-mono">
							+{story.score.toString()} • {story.by} • {new Date(story.time).toLocaleDateString()}
						</h2>
						{#if story.text}
							<div class="story not-mono">
								{@html story.text}
							</div>
						{/if}
						{#if story.url}
							<a
								href={story.url}
								class="overflow-hidden overflow-ellipsis max-w-full line-clamp-1 break-all px-4 py-1"
								>read more > {story.url}</a
							>
						{/if}
					</article>
					{#if index < top10.length - 1}
						<hr class="mt-4 mb-4 opacity-25" />
					{/if}
				{/each}
			</div>
		</Paper>
	</div>

	<div class="my-4">
		<p class="text-right" title={date.toISOString()}>
			via <a href="https://news.ycombinator.com/">news.ycombinator.com</a>
			• generated in {time.toFixed(2)} seconds • {date.toLocaleDateString()}
		</p>
	</div>
</Container>

<style lang="postcss">
	.story :global(p) {
		@apply my-2;
	}
</style>
