<script lang="ts">
	import { slide } from 'svelte/transition';

	export let expanded: boolean = false;
	export let padding: string = 'p-2';
	export let height: string = 'h-[512px]';

	function handleClick() {
		expanded = !expanded;
	}
</script>

<div>
	<button
		class="flex w-full flex-row {padding} mt-2 bg-gray-900"
		on:click={handleClick}
		title="expand"
	>
		<div>
			<slot name="header" />
		</div>
		<div class="grow" />
		<div>
			{#if expanded}
				<i class="fas fa-chevron-up" />
			{:else}
				<i class="fas fa-chevron-down" />
			{/if}
		</div>
	</button>
	{#if expanded}
		<hr class="border-gray-600" />
		<div
			class="block w-full bg-gray-900 {padding} {height} relative overflow-auto"
			in:slide={{ duration: 200 }}
			out:slide={{ duration: 200 }}
		>
			<slot name="content" />
		</div>
	{/if}
</div>
