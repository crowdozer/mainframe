<script lang="ts">
	export let kind: 'success' | 'warning' | 'info' | 'error' = 'info';
	export let fontSize: string = 'text-sm';

	function getColor() {
		switch (kind) {
			case 'warning':
				return 'text-yellow-400';
			case 'info':
				return 'text-cyan-600';
			case 'error':
				return 'text-red-600';
			case 'success':
				return 'text-green-600';
		}
	}
</script>

<span class="{getColor()} {fontSize}">
	<slot />
</span>
