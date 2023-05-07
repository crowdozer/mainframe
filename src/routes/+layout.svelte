<script lang="ts">
	import { clerkUser } from '$web/stores/clerk';
	import Layout from '$web/components/Layout.svelte';
	import Loading from '$web/components/ui/Loading.svelte';
	import Analytics from '$web/components/Analytics.svelte';

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
</script>

<Toaster />
<NavigationProgress />
<Analytics />

{#if $clerkUser.loading}
	<Layout showNavbar={false} showFooter={false}>
		<Loading />
	</Layout>
{:else}
	<slot />
{/if}
