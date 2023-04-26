<script lang="ts">
	import CopyClickIcon from './CopyClickIcon.svelte';

	export let code: string = '';
	export let lines: number = 1500;

	const split = code.split('\n');
	const visible = split.slice(0, lines);
</script>

<div class="mockup-code">
	{#each visible as line, index}
		<pre data-prefix={index + 1}><code>{line}</code></pre>
	{/each}
	{#if split.length > lines}
		<pre class="p-4"><code class="text-warning">+ {split.length - lines} more</code></pre>
	{/if}
</div>
<CopyClickIcon text={code} />
