<script lang="ts">
	export let loading: boolean;
</script>

{#if loading}
	<i class="fas fa-spin fa-spinner" />
{:else}
	<slot />
{/if}
