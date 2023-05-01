<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="absolute right-2 top-2">
	<button
		class="btn-square btn m-2 aspect-[1/1] active:variant-ringed-primary hover:text-primary-500"
		on:click={handleClick}
		title="copy"
	>
		<i class="fas fa-copy" />
	</button>
</div>
