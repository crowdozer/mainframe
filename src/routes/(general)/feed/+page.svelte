<script lang="ts">
	import Container from '$web/components/ui/Container.svelte';
	import Feed from '$web/components/Feed/Feed.svelte';
	import type { PageData } from './$types';
	import AsciiRipple from '$web/components/AsciiRipple/AsciiRipple.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>rss feeds</title>
</svelte:head>

<Container>
	<AsciiRipple />

	<Feed feed={data} />
</Container>
