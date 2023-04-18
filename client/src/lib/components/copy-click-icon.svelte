<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="absolute right-0 top-0">
	<button
		on:click={handleClick}
		title="copy"
		class="border border-dashed border-gray-600 hover:bg-gray-950 hover:opacity-75 active:bg-gray-950 active:opacity-50"
	>
		<i class="fas fa-copy m-4" />
	</button>
</div>
