<script>
	import Layout from '$web/components/layout.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>
	
<Toaster />

<Layout>
	<slot />
</Layout>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	@import '../styles.css';
</style>
