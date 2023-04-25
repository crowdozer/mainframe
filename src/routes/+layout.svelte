<script lang="ts">
	import Layout from '$web/components/Layout.svelte';
	import { clerkUser } from '$web/stores/clerk';
	import Loading from '$web/components/ui/Loading.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />

<Layout showNavbar={!$clerkUser.loading}>
	{#if !$clerkUser.loading}
		<slot />
	{:else}
		<div class="h-screen w-screen">
			<Loading />
		</div>
	{/if}
</Layout>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	@import '../styles.css';
</style>
