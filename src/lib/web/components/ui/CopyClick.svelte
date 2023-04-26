<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<span class="contents">
	<span class="contents">{text}</span>

	<button on:click={handleClick} class="text-s1 btn btn-sm variant-ringed-primary px-3 py-0.5">
		copy
	</button>
</span>
