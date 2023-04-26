<script lang="ts">
	import { clerkUser } from '$web/stores/clerk';
	import Layout from '$web/components/Layout.svelte';
	import Loading from '$web/components/ui/Loading.svelte';
	import NavigationProgress from '$web/components/NavigationProgress.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { AppShell, storePopup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	// Your selected Skeleton theme:
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '~/app.postcss';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toaster />
<NavigationProgress />

<Layout showNavbar={!$clerkUser.loading}>
	{#if !$clerkUser.loading}
		<slot />
	{:else}
		<div class="contents">
			<Loading />
		</div>
	{/if}
</Layout>
