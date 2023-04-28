<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { auth, reload, error } = data;

	onMount(() => {
		if (reload) {
			window.location.href = `${window.location.origin}${window.location.pathname}`;
		}

		if (auth) {
			setTimeout(() => {
				window.location.href = auth;
			});
		}
	});
</script>

<div class="container mx-auto my-32 max-w-xl">
	{#if error}
		<h2 class="text-error-500">Something went wrong</h2>
		<p class="mt-8">{error}</p>
	{:else if auth}
		<div class="my-8">
			<p>Redirecting...</p>
			<a href={auth}>click here if you are not automatically redirected</a>
		</div>
	{/if}
</div>
