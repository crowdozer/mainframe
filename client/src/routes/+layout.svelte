<script>
	import Layout from '$lib/components/layout.svelte';
</script>

<Layout>
	<slot />
</Layout>

<style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
	@import '../styles.css';
</style>
