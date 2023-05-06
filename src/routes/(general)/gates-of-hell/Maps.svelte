<script lang="ts">
	import Card from '$web/components/ui/Card.svelte';
	import { get } from './utils/manipulation';
	import { maps } from './utils/maps';

	export let status: any;

	function getMaps() {
		const mapPoints = get(status, 'saveinfo.mapPoints');
		const maps = [];

		for (const mapPoint of mapPoints) {
			const data = ['mappoint', ...mapPoint];
			const map = get(data, 'mappoint.map');

			if (map) {
				const regex = /multi\/(\w+):/;
				const match = regex.exec(map[0]);
				if (match) {
					const result = match[1];

					maps.push(result);
				}
			}
		}

		return maps;
	}
</script>

<div class="grid grid-cols-2 gap-4">
	{#each getMaps() as map}
		<Card image="./images/goh/maps/{map}.webp" header={maps[map]} subheader={map} />
	{/each}
</div>
