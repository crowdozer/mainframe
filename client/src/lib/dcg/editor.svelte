<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import Container from '$lib/components/container.svelte';
	import Accordions from './accordions.svelte';
	import { exportFile } from './utils/exportFile';
	import { parseSave } from './utils/parseSaveFile';

	let files: FileList;
	let data: { campaign: any; status: any };

	$: if (files) {
		(async function () {
			data = await parseSave(files[0]);
		})();
	}

	function handleExport() {
		exportFile('new.sav', data);
	}
</script>

<Container>
	<h1 class="my-8 text-2xl">Gates of Hell Editor</h1>
	<p class="mb-1">Save files are commonly located at:</p>
	<p class="bg-gray-900 p-4">
		Documents\my games\gates of hell\profiles\(steam id)\campaign\(file).sav
	</p>
	<div class="my-4">
		<input type="file" bind:files />
	</div>
	{#if files}
		<Accordions save={data} />
		<hr class="my-4 opacity-25" />
		<div class="text-right">
			<Button on:click={handleExport}>Export</Button>
		</div>
	{/if}
</Container>
