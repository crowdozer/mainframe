<script lang="ts">
	import Container from '$lib/components/container.svelte';
	// import Intro from '$lib/components/intro/intro.svelte';
	import type { PageData } from './$types';
	import Feed from '$lib/views/feed/feed.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>hi</title>
</svelte:head>

<Container>
	<!-- Hero section -->
	<!-- <div class="my-8 lg:my-32">
		<Intro />
	</div>
	<div class="mx-auto text-center text-2xl my-8 lg:my-16">
		<i class="fas fa-chevron-down" />
	</div> -->

	<Feed feed={data} />
</Container>
