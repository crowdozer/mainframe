<script lang="ts">
	export let text: string;

	function handleClick() {
		navigator.clipboard.writeText(text);
	}
</script>

<span class="contents">
	<span class="contents">{text}</span>
	<button
		class="rounded px-2 text-cyan-500 hover:bg-cyan-950 active:translate-y-[1px] active:text-cyan-600"
		on:click={handleClick}>copy</button
	>
</span>
