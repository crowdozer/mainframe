<script lang="ts">
	import CopyClickIcon from './CopyClickIcon.svelte';

	export let code: string = '';
	export let lines: number = 250;

	const split = code.split('\n');
	const visible = split.slice(0, lines);
</script>

<div class="relative">
	<CopyClickIcon text={code} />
	<div class="mockup-code overflow-auto">
		{#each visible as line, index}
			<pre class="unstyled border-r-0 bg-none px-2 py-0" data-prefix={index + 1}><code>{line}</code
				></pre>
		{/each}
		{#if split.length > lines}
			<div class="p-4 text-center">
				<code class="text-warning">+ {split.length - lines} more</code>
			</div>
		{/if}
	</div>
</div>

<style>
	.mockup-code {
		counter-reset: line-numbers;
		max-height: 500px;
		background: rgba(0, 0, 0, 0.25) !important;
	}
	.mockup-code pre::before {
		counter-increment: line-numbers;
		content: counter(line-numbers);
		display: inline-block;
		width: 3rem;
		height: 100%;
		margin-right: 1em;
		text-align: right;
		user-select: none;
		opacity: 0.5;
	}
</style>
