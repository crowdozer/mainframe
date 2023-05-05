<script lang="ts">
	import Navbar from '$web/components/Navbar.svelte';
	// import CRT from './CRT.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from './Footer.svelte';

	export let showNavbar: boolean = true;
	export let showFooter: boolean = true;
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

<!-- <CRT /> -->
