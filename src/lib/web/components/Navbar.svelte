<script>
	import ProfileMenu from '$web/components/ProfileMenu/ProfileMenu.svelte';
</script>

<nav class="relative">
	<div class="mx-auto flex max-w-6xl">
		<!-- Logo -->
		<a href="/" class="btn self-center hover:variant-ringed-primary"> crwdzr.io </a>

		<!-- Buttons -->
		<div class="ml-auto inline-flex items-center gap-2">
			<div class="hidden sm:contents">
				<a href="/feed" class="btn hover:variant-ringed-primary">
					<span><i class="fas fa-rss" /> rss feeds</span>
				</a>
			</div>

			<div class="hidden sm:contents">
				<a
					href="https://github.com/crowdozer/mainframe"
					class="btn hover:variant-ringed-primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					<span><i class="fab fa-github mr-1" /> github</span>
				</a>
			</div>
			<ProfileMenu />
		</div>
	</div>
	<hr class="absolute bottom-0 left-0 right-0" />
</nav>

<style lang="postcss">
	nav {
		@apply sticky left-0 top-0 z-50 w-full bg-transparent px-4 py-2;
		backdrop-filter: blur(5px);
	}
</style>
