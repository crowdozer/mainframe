<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$lib/components/button/button.svelte';
	import Container from '$lib/components/container.svelte';
	import Input from '$lib/components/input.svelte';
	import Paper from '$lib/components/paper.svelte';
	import Accordions from './accordions.svelte';
	import { exportFile } from './utils/exportFile';
	import { get, set } from './utils/manipulation';
	import { parseSave } from './utils/parseSaveFile';
	import { lockUnitsToYear } from './utils/modifications';
	import Label from '$lib/components/label.svelte';

	let files: FileList;
	let fileInput: HTMLInputElement;
	let data: { campaign: any; status: any };

	$: if (files) {
		(async function () {
			if (files.length) {
				data = await parseSave(files[0]);
			}
		})();
	}

	function handleExport() {
		exportFile('new.sav', data);
	}

	function handleChange(event: any) {
		data = {
			...data,
			status: set(data.status, event.target.name, event.target.value)
		};
	}

	function handleSetByYear(event: Event) {
		// @ts-ignore
		const target_year = event.currentTarget.target_year.value;
		// @ts-ignore
		const faction = event.currentTarget.faction.value;

		data = {
			...data,
			status: lockUnitsToYear(faction, target_year, data.status)
		};
	}

	function handleClear() {
		// @ts-ignore
		fileInput.value = null;
		// @ts-ignore
		files = fileInput.files;
		// @ts-ignore
		data = null;
	}

	const resourceForm = [
		['saveinfo.name', 'Name'],
		['saveinfo.mp', 'MP (purchasing power)'],
		['saveinfo.rp', 'RP (research points)'],
		['saveinfo.ap', 'AP (ammo points)'],
		['saveinfo.sp', 'SP (special points)']
	];
</script>

<Container>
	<h1 class="mt-8 text-2xl">Gates of Hell Editor</h1>
	<div class={data ? 'hidden' : 'block'}>
		<p class="mt-16">To begin, locate your savefile.</p>
		<p class="mt-1">Save files are commonly located at:</p>
		<p class="mt-1 bg-gray-900 p-4">
			Documents\my games\gates of hell\profiles\(steam id)\campaign\(file).sav
		</p>
		<div class="mt-4">
			<input type="file" bind:files bind:this={fileInput} />
		</div>
	</div>
	{#if data}
		<div in:slide={{ duration: 200 }}>
			<div class="mt-4 flex flex-col gap-4">
				{#each resourceForm as [path, label]}
					<Input name={path} {label} on:change={handleChange} value={get(data.status, path)} />
				{/each}
			</div>
			<hr class="mt-4 opacity-25" />
			<div class="mt-4">
				<p>Set research by year <Label>expiremental</Label></p>
				<form class="flex flex-col gap-2" on:submit={handleSetByYear}>
					<Input name="target_year" placeholder="Year (i.e 1940)" />
					<Input name="faction" placeholder="Faction (i.e fin)" />
					<Button type="submit">set</Button>
				</form>
			</div>
			<hr class="mt-4 opacity-25" />
			<div class="mt-4">
				<Accordions save={data} />
			</div>
			<hr class="mt-4 opacity-25" />
			<div class="mt-4 text-right">
				<Button on:click={handleClear}>clear</Button>
				<Button on:click={handleExport}>Export</Button>
			</div>
		</div>
	{/if}
	<hr class="mt-16 opacity-25" />
	<div class="mt-4">
		<Paper kind="error" bordered>
			<div class="p-4">
				<h1 class="mb-2 text-2xl text-red-600">WARNING</h1>
				<p>Please back up your save before using this utility.</p>
				<p>I am not liable for damages to your savegame.</p>
			</div>
		</Paper>
	</div>
	<div class="mt-4">
		<Paper kind="warning" bordered>
			<div class="p-4">
				<h1 class="mb-2 text-lg text-yellow-600">SLIGHTLY LESS SERIOUS WARNING</h1>
				<p>This utility is not type-safe for you.</p>
				<p>Please use common sense for values that you enter.</p>
				<p>Be mindful of data types, "quotation marks", and "id10T" errors.</p>
			</div>
		</Paper>
	</div>
</Container>
