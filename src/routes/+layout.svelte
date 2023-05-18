<script lang="ts">
	import Analytics from '$web/components/Analytics.svelte';
	import { initialize } from '$web/stores/clerk';
	import { onMount } from 'svelte';

	import NavigationProgress from '$web/components/NavigationProgress.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '~/app.postcss';

	// Allows for toast
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	onMount(() => {
		initialize();
	});
</script>

<svelte:head>
	<title>crwdzr.io</title>
</svelte:head>

<Toaster />
<NavigationProgress />
<Analytics />

<slot />
