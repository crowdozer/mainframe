<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '$web/components/button/button.svelte';
	import Container from '$web/components/container.svelte';
	import Input from '$web/components/ui/input.svelte';
	import Paper from '$web/components/paper.svelte';
	import Accordions from './accordions.svelte';
	import { exportFile } from './utils/exportFile';
	import { get, set, isAttacking } from './utils/manipulation';
	import { parseSave } from './utils/parseSaveFile';
	import { lockUnitsToYear } from './utils/modifications';
	import Label from '$web/components/label.svelte';
	import Mods from './mods.svelte';
	import Maps from './maps.svelte';
	import Select from '../ui/select.svelte';

	let files: FileList;
	let fileInput: HTMLInputElement;
	let data: { campaign: any; status: any };
	let attacking = false;

	/**
	 * React to the FileList changing. If it does,
	 * try to parse the first one as a savefile
	 */
	$: if (files && !data) {
		(async function () {
			if (files.length) {
				data = await parseSave(files[0]);
				attacking = isAttacking(data.status);
			} else {
				// @ts-ignore
				data = undefined;
			}
		})();
	}

	/**
	 * Handle exporting of saves
	 */
	function handleExport() {
		exportFile('new.sav', data);
	}

	/**
	 * Handle setting the research year
	 */
	function handleSetByYear(event: Event) {
		const old = { ...data };

		try {
			// @ts-ignore
			const target_year = event.currentTarget.target_year.value;
			// @ts-ignore
			const faction = event.currentTarget.faction.value;

			data = {
				...data,
				status: lockUnitsToYear(faction, target_year, data.status)
			};
		} catch (error) {
			data = { ...old };
		}
	}

	function handleInputChange(event: any) {
		const { name, value } = event.target;
		data = {
			...data,
			status: set(data.status, name, value)
		};
	}

	function handleClear() {
		// @ts-ignore
		fileInput.value = null;
		// @ts-ignore
		files = fileInput.files;
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
	<p>
		click <a href="/blog/2023/04/18/goh-editor" rel="noopener noreferrer" target="_blank">here</a> for
		an explanation
	</p>
	<!-- Uploader -->
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
	<!-- Savegame Editor -->
	{#if data}
		<Mods status={data.status} />

		<div in:slide={{ duration: 200 }}>
			<!-- Maps -->
			<div class="mt-4">
				<Paper bordered>
					<div class="flex flex-col gap-2 p-4">
						<h3 class="text-lg">
							Next Map <Label kind="warning">{attacking ? 'Attacking' : 'Defending'}</Label>
						</h3>
						<Maps status={data.status} />
					</div>
				</Paper>
			</div>
			<!-- Campaign State -->
			<div class="mt-4">
				<Paper bordered>
					<div class="flex flex-col gap-4 p-4">
						<h3 class="text-lg">Campaign State</h3>
						{#each resourceForm as [path, label]}
							<Input
								name={path}
								{label}
								on:change={handleInputChange}
								value={get(data.status, path)}
							/>
						{/each}
					</div>
				</Paper>
			</div>
			<!-- Research Year -->
			<div class="mt-4">
				<Paper bordered>
					<div class="flex flex-col gap-2 p-4">
						<h3 class="text-lg">Set research to year <Label>expiremental</Label></h3>
						<form class="flex flex-col gap-4 mt-4" on:submit={handleSetByYear}>
							<Input name="target_year" placeholder="Year (i.e 1940)" />
							<Select name='faction' defaultValue="fin">
								<option value="fin">Finland</option>
							</Select>
							<Button type="submit">set</Button>
						</form>
					</div>
				</Paper>
			</div>
			<!-- Debug Accordions -->
			<div class="mt-4">
				<Accordions save={data} />
			</div>
			<!-- Controls -->
			<hr class="mt-4 opacity-25" />
			<div class="mt-4 text-right">
				<Button on:click={handleClear}>clear</Button>
				<Button on:click={handleExport}>Export</Button>
			</div>
		</div>
	{/if}
	<!-- Disclaimer Messages -->
	<div class="mt-16">
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
