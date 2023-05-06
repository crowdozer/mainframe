<script lang="ts">
	import type { CachedCurrentlyPlaying } from '$server/spotify/types';
	import Code from '$web/components/ui/Code.svelte';
	import Label from '$web/components/ui/Label.svelte';
	import { trpc } from '$web/utils/trpc';
	import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';

	const progress_interval_length = 1000; // how many ms to recaulate progress after
	const sync_interval_length = 5000; // how many ms to sync with spotify

	/**
	 * The interval that estimates playback %, runs every second
	 */
	let progInterval: any;

	/**
	 * The interval that requests current playback state
	 * This is less frequent than the interval that estimates progress %
	 */
	let reqInterval: any;

	// data about the current track
	let data: CachedCurrentlyPlaying | null = null;

	// current track title
	let title: string = '';
	// current track preview image
	let preview: string | null = null;
	// [url, name, isLastArtist]
	let artists: [string, string, boolean][] = [];
	// [currentProgressInSeconds, lengthInSeconds]
	let progress: [number, number] = [0, 0];

	// Error to show if fetching playback state fails
	let playbackError: string | null = null;

	function getTitle() {
		if (!data?.data?.item) return '';
		const { item } = data.data;

		switch (item.type) {
			case 'track':
				return item.name;
			default:
				return 'unhandled track type';
		}
	}

	function getPreview(): string | null {
		if (!data?.data?.item) return null;
		const { item } = data.data;

		switch (item.type) {
			case 'track':
				return item.album.images[0].url;
			default:
				return null;
		}
	}

	function getArtists(): [string, string, boolean][] {
		if (!data?.data?.item) return [];
		const { item } = data.data;

		switch (item.type) {
			case 'track':
				const len = item.artists.length;
				return item.artists.map((artist, i) => [
					artist.external_urls.spotify,
					artist.name,
					i < len - 1,
				]);
			default:
				return [];
		}
	}

	function getProgress(): [number, number] {
		// console.log('recalculating progress');

		if (!data?.data?.item) return [0, 0];
		const { item } = data.data;

		const now = new Date();
		const spotifyProgressMS = data.data.progress_ms || 0;
		const trackDurationMS = item.duration_ms;

		if (!data.data.is_playing) {
			return [Math.round(spotifyProgressMS / 1000), Math.round(trackDurationMS / 1000)];
		}

		const cacheAgeMS = now.getTime() - data.on.getTime();
		let realProgressMS = spotifyProgressMS + cacheAgeMS;

		if (realProgressMS > trackDurationMS) {
			realProgressMS = trackDurationMS;
		}

		return [Math.round(realProgressMS / 1000), Math.round(trackDurationMS / 1000)];
	}

	function secondsToTime(duration: number): string {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;

		const mPad = minutes.toString().padStart(2, '0');
		const sPad = seconds.toString().padStart(2, '0');

		return `${mPad}:${sPad}`;
	}

	async function getData() {
		// console.log('fetching data');
		data = await trpc()
			.spotify.getMyStatus.query()
			.catch((error) => {
				playbackError = error.message || 'An unknown error occurred';
				console.error(error);
				stop();
				return null;
			});
	}

	async function start() {
		// console.log('starting intervals');
		await getData();
		reqInterval = setInterval(() => {
			getData();
		}, sync_interval_length);

		progress = getProgress();
		progInterval = setInterval(async () => {
			progress = getProgress();
		}, progress_interval_length);
	}

	function stop() {
		// console.log('stopping intervals');
		if (progInterval) clearInterval(progInterval);
		if (reqInterval) clearInterval(reqInterval);
	}

	/**
	 * Reactivity for viewing data
	 */
	$: if (data) {
		title = getTitle();
		preview = getPreview();
		artists = getArtists();
	}

	onMount(() => start());
	onDestroy(() => stop());
</script>

<div class="container mx-auto my-16 max-w-4xl p-4 lg:p-0">
	<div class="flex flex-col gap-16">
		<div class="flex flex-col gap-2">
			<h3>Spotify Connection</h3>
			<hr class="mb-2" />
			<div class="flex flex-col gap-2 lg:flex-row">
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
			{#if data}
				<div class="flex flex-col gap-8">
					<!-- Track Info -->
					<div class="flex flex-col gap-8 lg:flex-row">
						<!-- Track art -->
						<div class="aspect-[1/1] h-full w-full lg:h-32 lg:w-32">
							{#if preview}
								<img src={preview} alt={'spotify'} class="h-full w-full" />
							{/if}
						</div>
						<!-- Artist Info -->
						<div class="flex grow">
							<div class="flex flex-row gap-8">
								<div>
									<h3>{title}</h3>
									<p class="flex flex-row gap-2">
										{#each artists as artist, i}
											<span class="flex">
												<a href={artist[0]} target="_blank" rel="noopener noreferrer">
													{artist[1]}
												</a>
												<span>{artist[2] ? ', ' : ''}</span>
											</span>
										{/each}
									</p>
								</div>
								<div class="grow" />
								<!-- <div>
								<a class="btn btn-icon hover:variant-ghost-primary">
									<i class="fab fa-spotify text-2xl" />
								</a>
							</div> -->
							</div>
						</div>
					</div>

					<!-- Player -->
					<div class="flex flex-col gap-2">
						<div class="flex flex-row gap-8">
							<div>{secondsToTime(progress[0])}</div>
							<div class="flex grow">
								<ProgressBar value={progress[0]} max={progress[1]} class="self-center" />
							</div>
							<div>{secondsToTime(progress[1])}</div>
						</div>
					</div>
				</div>

				<div class="mt-8">
					<Accordion>
						<AccordionItem>
							<svelte:fragment slot="summary">Status <Label>debug</Label></svelte:fragment>
							<svelte:fragment slot="content"
								><Code lines={1000} code={JSON.stringify(data, null, 4)} /></svelte:fragment
							>
						</AccordionItem>
					</Accordion>
				</div>
			{:else if playbackError}
				<p class="mt-8 text-error-500">error: {playbackError}</p>
			{/if}
		</div>
	</div>
</div>
