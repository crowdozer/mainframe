<script lang="ts">
	export let kind: 'success' | 'warning' | 'info' | 'error' | 'neutral' = 'neutral';
	export let bordered = false;

	function getBorderColor(): string {
		if (!bordered) return '';

		switch (kind) {
			case 'neutral':
				return 'border border-dashed border-gray-600';
			case 'warning':
				return 'border border-dashed border-yellow-600';
			case 'info':
				return 'border border-dashed border-cyan-600';
			case 'error':
				return 'border border-dashed border-red-600';
			case 'success':
				return 'border border-dashed border-green-600';
		}
	}
</script>

<div class="inline-block h-full w-full {getBorderColor()} content relative">
	<slot />
</div>

<style>
	.content::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		backdrop-filter: blur(10px);
	}
</style>
