<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Google Analytics
	const measurementID = 'G-SDQPP9QJ3H';

	// Vercel Analytics
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	onMount(() => {
		if (typeof window.gtag !== 'undefined') {
			window.gtag('config', measurementID, {
				page_title: document.title,
				page_path: $page.url.pathname,
			});
		}
	});
</script>

<svelte:head>
	<script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementID}`}>
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', mID);
	</script>
</svelte:head>
