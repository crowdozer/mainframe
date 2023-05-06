<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { resume, error } = data;

	const hasNextLink = typeof resume === 'string';

	onMount(() => {
		if (hasNextLink) {
			window.location.href = resume;
		}
	});
</script>

<div class="container mx-auto my-32 max-w-xl">
	{#if error}
		<h2 class="text-error-500">Something went wrong</h2>
		<p class="mt-8">{error}</p>
	{:else if hasNextLink}
		<div class="my-8">
			<p>Redirecting...</p>
			<a href={resume}>click here if you are not automatically redirected</a>
		</div>
	{/if}
</div>
