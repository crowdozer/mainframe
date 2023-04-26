<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<div class="absolute right-4 top-4">
	<button class="btn-square btn" on:click={handleClick} title="copy">
		<i class="fas fa-copy m-4" />
	</button>
</div>
