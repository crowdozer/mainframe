<script lang="ts">
	export let kind: 'info' = 'info';
	export let fontSize: string = 'text-sm';

	function getColor() {
		switch (kind) {
			case 'info':
				return 'text-cyan-500';
		}
	}
</script>

<span class="{getColor()} {fontSize}">
	<slot />
</span>
