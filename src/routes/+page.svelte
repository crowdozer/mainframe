<script lang="ts">
	import Container from '$web/components/ui/Container.svelte';
	import Intro from '$web/components/Intro/Intro.svelte';
	import Feed from '$web/components/Feed/Feed.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>hi</title>
</svelte:head>

<Container>
	<!-- Hero section -->
	<div class="my-8 lg:my-32">
		<Intro />
	</div>
	<div class="mx-auto text-center text-2xl my-8 lg:my-16">
		<i class="fas fa-chevron-down" />
	</div>

	<Feed feed={data} />
</Container>
