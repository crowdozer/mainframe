<script lang="ts">
	export let kind: 'success' | 'warning' | 'info' | 'error' = 'info';
	export let outlined: boolean = true;
</script>

<span class="badge badge-{kind} {outlined && 'badge-outline'}">
	<slot />
</span>
