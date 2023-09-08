<script lang="ts">
	import { get } from './utils/manipulation';

	export let status: any[];
	let mods: string[] = [];

	function getMods(): string[] {
		const mods = get(status, 'saveinfo.mods');
		if (!mods) return [];

		return mods.map((mod: string) => {
			return mod.split('_')[1].split(':')[0];
		});
	}

	$: if (status) {
		mods = getMods();
	}
</script>

{#if mods.length > 0}
	<div class="mt-4">
		<div class="px-4 border border-neutral-700">
			<div class="p-4">
				<p>The following mods were detected:</p>
				<ul>
					{#each mods as mod}
						<li>
							<a
								href="https://steamcommunity.com/sharedfiles/filedetails/?id={mod}"
								target="_blank"
								rel="noopener noreferrer">{mod}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}
