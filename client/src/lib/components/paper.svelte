<script lang="ts">
	export let kind: 'success' | 'warning' | 'info' | 'error' | 'neutral' = 'neutral';

	function getBorderColor(): string {
		switch (kind) {
			case 'neutral':
				return 'border-gray-600';
			case 'warning':
				return 'border-yellow-600';
			case 'info':
				return 'border-cyan-600';
			case 'error':
				return 'border-red-600';
			case 'success':
				return 'border-green-600';
		}
	}
</script>

<div class="inline-block h-full w-full relative border border-dashed {getBorderColor()} content">
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
