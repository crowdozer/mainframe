<script lang="ts">
	import Code from '$web/components/ui/Code.svelte';
	import Label from '$web/components/ui/Label.svelte';
	import { trpc } from '$web/utils/trpc';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let data: any = '';

	onMount(async () => {
		const response = await trpc()
			.spotify.getMyStatus.query()
			.catch((error) => {
				return null;
			});

		data = JSON.stringify(response, null, 4);
	});
</script>

<div class="container mx-auto my-16 max-w-4xl">
	<div class="flex flex-col gap-16">
		<div class="flex flex-col gap-2">
			<h3>Spotify Connection</h3>
			<hr class="mb-2" />
			<div class="flex flex-row gap-2">
				<a
					class="btn variant-ringed-error"
					href="/spotify/auth/logout"
					data-sveltekit-preload-data="tap">Disconnect</a
				>
				<a
					class="btn variant-ringed-warning"
					href="/spotify/auth/reset"
					data-sveltekit-preload-data="tap">Reconnect</a
				>
				<a class="btn variant-ringed-success" href="/spotify/auth" data-sveltekit-preload-data="tap"
					>Connect</a
				>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h3>Spotify Data</h3>
			<hr class="mb-2" />
			{#if data}
				<Accordion>
					<AccordionItem open>
						<svelte:fragment slot="summary">Status <Label>debug</Label></svelte:fragment>
						<svelte:fragment slot="content"><Code lines={1000} code={data} /></svelte:fragment>
					</AccordionItem>
				</Accordion>
			{:else}
				<p>Nothing to show</p>
			{/if}
		</div>
	</div>
</div>
