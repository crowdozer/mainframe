<script lang="ts">
	import Input from '$web/components/ui/Input.svelte';
	import Paper from '$web/components/ui/Paper.svelte';
	import { clerkUser } from '$web/stores/clerk';
	import { useTRPC } from '$web/utils/trpc';

	let key: string = 'foo';
	let getLoading: boolean = false;
	let setLoading: boolean = false;

	let getValue: string | null = '';
	let setValue: string = '';

	async function handleGet() {
		getLoading = true;
		await useTRPC(async (t) => {
			const result = await t().cache.get.query({ key });
			getValue = result.value;
		});
		getLoading = false;
	}

	async function handleSet() {
		setLoading = true;
		await useTRPC((t) => t().cache.set.mutate({ key, value: setValue }));
		setLoading = false;
	}
</script>

<svelte:head>
	<title>Redis Demo</title>
</svelte:head>

<div class="container mx-auto max-w-sm py-16">
	<div class="m-4">
		<Paper bordered>
			<div class="m-4 flex flex-col gap-4">
				<!-- Key Section -->
				<h2>Redis Cache Key</h2>
				<Input name="cache-key" label="key" placeholder="key" bind:value={key} />

				<!-- Get Section -->
				<h3 class="mt-8 text-xl">Get Value</h3>
				<Input
					name="cache-get-value"
					label="value"
					placeholder="value"
					value={getValue}
					disabled={getLoading}
					readonly
				/>
				<button class="btn variant-ringed-primary" on:click={handleGet} disabled={getLoading}>
					{#if getLoading}
						<span><i class="fa fa-spin fa-spinner" /></span>
					{:else}
						get
					{/if}
				</button>

				<!-- Set Section -->
				{#if $clerkUser.user}
					<h3 class="mt-4 text-xl">Set Value</h3>
					<Input
						name="cache-set-value"
						label="value"
						placeholder="value"
						bind:value={setValue}
						disabled={setLoading}
					/>
					<button class="btn variant-ringed-primary" on:click={handleSet} disabled={setLoading}>
						{#if setLoading}
							<span><i class="fa fa-spin fa-spinner" /></span>
						{:else}
							set
						{/if}
					</button>
				{/if}
			</div>
		</Paper>
	</div>
</div>
