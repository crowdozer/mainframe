<script lang="ts">
	import Accordion from '$web/components/accordion/accordion.svelte';
	import CopyClickIcon from '$web/components/copy-click-icon.svelte';
	import Label from '$web/components/label.svelte';

	export let save: { status: any; campaign: any };
	let status: string;
	let campaign: string;

	$: if (save) {
		status = render(save.status);
		campaign = render(save.campaign);
	}

	function render(data: any): string {
		return (
			// Stringify everything, format it with indentation
			JSON.stringify(data, null, 4)
				// Replaces escaped double quotes with double quotes,
				// removes unescaped double quotes.
				.replace(/(?:"\\")|(?:\\"")|(")/g, function (_, capture) {
					if (!capture) {
						return '"';
					} else {
						return '';
					}
				})
		);
	}
</script>

<Accordion>
	<svelte:fragment slot="header">Status <Label>debug</Label></svelte:fragment>
	<svelte:fragment slot="content">
		<pre class="p-4">{status}</pre>
		<CopyClickIcon text={status} />
	</svelte:fragment>
</Accordion>
<Accordion>
	<svelte:fragment slot="header">Campaign <Label>debug</Label></svelte:fragment>
	<svelte:fragment slot="content">
		<pre class="p-4">{campaign}</pre>
		<CopyClickIcon text={campaign} />
	</svelte:fragment>
</Accordion>
