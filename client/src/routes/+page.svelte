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
	<div class="my-8 lg:my-32">
		<Intro />
	</div>

	<div class="mx-auto text-center text-2xl my-8 lg:my-16">
		<i class="fas fa-chevron-down" />
	</div>

	<div class="my-4">
		<Paper>
			<div class="m-8">
				{#each top10 as story, index}
					<article class="flex flex-col gap-1">
						<!-- header line -->
						<h1 class="text-xl text-ellipsis whitespace-nowrap overflow-hidden" title={story.title}>
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

						<!-- author/meta line -->
						<h2 class="text-sm text-gray-500 not-mono mb-6 lg:pl-10">
							+{story.score.toString()} • {story.by} • {new Date(story.time).toLocaleDateString()}
						</h2>

						<!-- story content -->
						{#if story.text}
							<div class="story not-mono break-words lg:pl-10" style="word-break:break-word;">
								{@html story.text}
							</div>
						{/if}

						<!-- story URL -->
						{#if story.url}
							<a
								href={story.url}
								class="text-ellipsis whitespace-nowrap overflow-hidden pr-4 py-2 lg:pl-10"
								target="_blank"
								rel="noopener noreferrer">read more > {story.url}</a
							>
						{/if}
					</article>

					<!-- dividers -->
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
