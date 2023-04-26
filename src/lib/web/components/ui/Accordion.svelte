<script lang="ts">
	import { slide } from 'svelte/transition';
	import Paper from './Paper.svelte';

	export let padding: string = 'p-2';
	export let height: string = 'max-h-[512px]';

	export let expanded: boolean = false;

	function toggle() {
		expanded = !expanded;
	}
</script>

<Paper bordered>
	<button class="collapse-title flex" on:click={toggle}>
		<div class="text-left">
			<slot name="header" />
		</div>
		<div class="grow" />
		<i class="fas fa-chevron-{expanded ? 'up' : 'down'} self-center" />
	</button>
	{#if expanded}
		<div
			class="block w-full {padding} {height} relative overflow-auto"
			in:slide={{ duration: 150 }}
			out:slide={{ duration: 150 }}
		>
			<slot name="content" />
		</div>
	{/if}
</Paper>
