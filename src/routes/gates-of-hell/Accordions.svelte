<script lang="ts">
	import Accordion from '$web/components/ui/Accordion.svelte';
	import Code from '$web/components/ui/Code.svelte';
	import Label from '$web/components/ui/Label.svelte';

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
		<Code code={status} />
	</svelte:fragment>
</Accordion>
<Accordion>
	<svelte:fragment slot="header">Campaign <Label>debug</Label></svelte:fragment>
	<svelte:fragment slot="content">
		<Code code={campaign} />
	</svelte:fragment>
</Accordion>
