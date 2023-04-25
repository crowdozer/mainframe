<script>
	import Layout from '$web/components/layout.svelte';
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
