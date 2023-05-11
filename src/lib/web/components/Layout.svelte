<script lang="ts">
	import Navbar from '$web/components/Navbar.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$web/components/Footer.svelte';

	export let showNavbar: boolean = true;
	export let showFooter: boolean = true;

	/**
	 * For some reason, scroll to top doesn't work on nav
	 * Doesn't appear to be skeleton-ui related, svelte-kit
	 * related most likely
	 *
	 * This is a workaround to listen to nav and force scroll
	 */
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		document.getElementById('page')?.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if showNavbar}
			<Navbar />
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
	<!-- Router Slot -->
	<div class="px-4">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">
		{#if showFooter}
			<Footer />
		{/if}
	</svelte:fragment>
	<!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
