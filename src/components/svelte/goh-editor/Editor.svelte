<script lang="ts">
	/**
	 * TODO: Clean this up
	 */

	import { slide } from 'svelte/transition';
	import { exportFile } from './utils/exportFile';
	import { get, set, isAttacking } from './utils/manipulation';
	import { parseSave } from './utils/parseSaveFile';
	import Mods from './Mods.svelte';
	import Maps from './Maps.svelte';

	let files: FileList;
	let data: { campaign: any; status: any };
	let attacking = false;

	/**
	 * React to the FileList changing. If it does,
	 * try to parse the first one as a savefile
	 */
	$: if (files && !data) {
		parseFiles();
	}

	async function parseFiles() {
		try {
			if (!files.length) {
				throw new Error('nothing to parse');
			}

			data = await parseSave(files[0]);
			attacking = isAttacking(data.status);
		} catch (error) {
			console.error(error);
			// @ts-ignore
			data = undefined;
		}
	}

	/**
	 * Handle exporting of saves
	 */
	function handleExport() {
		exportFile('new.sav', data);
	}

	function handleInputChange(event: any) {
		const { name, value } = event.target;
		data = {
			...data,
			status: set(data.status, name, value),
		};
	}

	function handleClear() {
		// @ts-ignore
		files = [];

		// @ts-ignore
		data = null;
	}

	const resourceForm = [
		['saveinfo.name', 'Name'],
		['saveinfo.mp', 'MP (purchasing power)'],
		['saveinfo.rp', 'RP (research points)'],
		['saveinfo.ap', 'AP (ammo points)'],
		['saveinfo.sp', 'SP (special points)'],
	];
</script>

<h1 class="text-4xl">Gates of Hell Editor</h1>

<!-- Disclaimer Messages -->
<div class="mt-4">
	<div class="px-4 border border-neutral-500">
		<div class="p-4">
			<p class="mb-2 font-bold text-yellow-500">NOTICE</p>
			<p>Please back up your save before using this utility.</p>
			<p>This utility does not validate what you type.</p>
			<p>Please use common sense for values that you enter.</p>
			<p class="mt-3">I am not liable for damages to your savegame.</p>
		</div>
	</div>
</div>

<!-- Uploader -->
<div class="{data ? 'hidden' : 'block'}">
	<div class="mt-8 space-y-2">
		<p>To begin, locate your savefile.</p>
		<p>Save files are commonly located at:</p>
		<p class="unstyled text-green-500 bg-neutral-950/25 font-mono p-4">
			Documents\my games\gates of hell\profiles\(steam id)\campaign\(file).sav
		</p>
		<div>
			<input type="file" bind:files name="files" on:change={parseFiles}  class="my-8" />
		</div>
	</div>
</div>

<!-- Savegame Editor -->
{#if data}
	<Mods status={data.status} />

	<div in:slide={{ duration: 200 }}>
		<!-- Maps -->
		<div class="mt-4">
			<div class="px-4 border border-neutral-700">

				<div class="flex flex-col gap-2 p-4">
					<h3 class="text-lg">
						Upcoming Maps <span class="text-base text-neutral-400 ml-2">{attacking ? 'attacking' : 'defending'}</span>
					</h3>
					<Maps status={data.status} />
				</div>
			</div>
		</div>
		<!-- Campaign State -->
		<div class="mt-4">
			<div class="px-4 border border-neutral-700">
				<div class="flex flex-col gap-4 p-4">
					<h3 class="text-lg">Campaign State</h3>
					{#each resourceForm as [path, label]}
						<div>
							<label class="block font-bold text-sm mb-1" for={path}>{label}</label>
							<input 
								class="p-2 px-4  bg-transparent border border-neutral-700 rounded"
								name={path}
								on:change={handleInputChange}
								value={get(data.status, path)}
							/>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Controls -->
		<div class="mt-4 text-right">
			<button class="p-2 rounded px-4 bg-neutral-800 hover:bg-neutral-700" on:click={handleClear}>clear</button>
			<button class="p-2 rounded px-4 bg-neutral-800 hover:bg-neutral-700" on:click={handleExport}>export</button>
		</div>
	</div>
{/if}

