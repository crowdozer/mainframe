<script lang="ts">
	import Accordion from '$lib/components/accordion/accordion.svelte';
	import CopyClickIcon from '$lib/components/copy-click-icon.svelte';

	export let save: { status: any; campaign: any };
	let status: string;
	let campaign: string;

	$: if (save) {
		status = render(save.status);
		campaign = render(save.campaign);
	}

	function render(data: any): string {
		return (
			// stringify everything, format it
			JSON.stringify(data, null, 2)
				// this goofy looking regex strips escaped quotes from the response
				// so they just look like normal quotes
				.replace(/\\\"|\"\\\""/g, '')
		);
	}
</script>

<Accordion>
	<svelte:fragment slot="header">Status</svelte:fragment>
	<svelte:fragment slot="content">
		<pre class="p-4">{status}</pre>
		<CopyClickIcon text={status} />
	</svelte:fragment>
</Accordion>
<Accordion>
	<svelte:fragment slot="header">Campaign</svelte:fragment>
	<svelte:fragment slot="content">
		<pre class="p-4">{campaign}</pre>
		<CopyClickIcon text={campaign} />
	</svelte:fragment>
</Accordion>
