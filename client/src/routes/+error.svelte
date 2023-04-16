<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container mx-auto my-8 max-w-sm">
	{#if $page.error}
		<p><strong>{$page.status}</strong> {$page.error.message}</p>
	{:else}
		<p><strong>{$page.status}</strong> An unknown error occurred</p>
	{/if}
</div>
