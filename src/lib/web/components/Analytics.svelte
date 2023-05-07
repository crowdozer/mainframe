<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Vercel Analytics
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });

	// Google Analytics
	onMount(() => {
		if (typeof window.gtag !== 'undefined') {
			window.gtag('config', 'G-SDQPP9QJ3H', {
				page_title: document.title,
				page_path: $page.url.pathname,
			});
		}
	});
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDQPP9QJ3H"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-SDQPP9QJ3H');
	</script>
</svelte:head>
