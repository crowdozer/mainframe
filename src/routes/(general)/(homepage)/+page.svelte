<script lang="ts">
	import Container from '$web/components/ui/Container.svelte';
	import Intro from '$web/components/Intro/Intro.svelte';
	import Feed from '$web/components/Feed/Feed.svelte';
	import type { PageData } from './$types';
	// import AsciiRipple from '$web/components/AsciiRipple/AsciiRipple.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>hi</title>
</svelte:head>

<!-- Hero section -->
<div class="relative py-8 lg:py-32">
	<Container>
		<Intro />
		<!-- <AsciiRipple /> -->
	</Container>
</div>

<Container>
	<div class="mx-auto my-8 text-center text-2xl lg:my-16">
		<i class="fas fa-chevron-down" />
	</div>

	<Feed feed={data} />
</Container>
