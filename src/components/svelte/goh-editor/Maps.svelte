<script lang="ts">
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

<div class="grid grid-cols-3 gap-4">
	{#each getMaps() as map}
		<div class="relative rounded border border-neutral-700">
			<img src="/images/goh/maps/{map}.webp" alt={map} class="w-full" />
			<div class="p-2 px-4 border-t border-neutral-700">
				<h1 class="text-lg">{maps[map]}</h1>
				<h2>{map}</h2>
			</div>
		</div>
	{/each}
</div>
