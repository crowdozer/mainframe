<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
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

<Accordion autocollapse>
	<AccordionItem>
		<svelte:fragment slot="summary">Status <Label>debug</Label></svelte:fragment>
		<svelte:fragment slot="content"><Code code={status} /></svelte:fragment>
	</AccordionItem>

	<AccordionItem>
		<svelte:fragment slot="summary">Campaign <Label>debug</Label></svelte:fragment>
		<svelte:fragment slot="content"><Code code={campaign} /></svelte:fragment>
	</AccordionItem>
</Accordion>
