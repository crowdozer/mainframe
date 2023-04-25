<script>
	import { onMount } from 'svelte'
	import Layout from '$web/components/Layout.svelte';
	import { initializeClerk } from '$web/utils/clerk';
	import { clerkUser } from '$web/stores/clerk';
	import Loading from '$web/components/ui/Loading.svelte';
	import { Toaster } from 'svelte-french-toast';

	clerkUser.subscribe(console.log)

	onMount(() => {
		initializeClerk()
	})
</script>

<Toaster />

<Layout showNavbar={!$clerkUser.loading}>
	{#if (!$clerkUser.loading)}
		<slot />
	{:else}
		<div class="w-screen h-screen">
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
