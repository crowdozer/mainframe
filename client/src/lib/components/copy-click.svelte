<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<span class="contents">
	<span class="contents">{text}</span>
	<button
		class="rounded px-2 text-green-500 hover:bg-green-950 active:translate-y-[1px] active:text-green-600"
		on:click={handleClick}>copy</button
	>
</span>
