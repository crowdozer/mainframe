<script>
	import Button from './button/button.svelte';
</script>

<nav class="relative">
	<div class="mx-auto flex max-w-6xl">
		<!-- Logo -->
		<div class="inline-flex items-center">
			<h1 class="text-xl font-bold">
				<a href="/">crwdzr.io</a>
			</h1>
		</div>

		<!-- Buttons -->
		<div class="ml-auto inline-flex items-center gap-2">
			<div class="hidden lg:flex">
				<Button icon="fab fa-github" link="https://www.github.com/crowdozer">git</Button>
			</div>
			<Button icon="fas fa-person-rifle" link="/gates-of-hell">ostfront</Button>
			<Button icon="fas fa-user-astronaut" link="/galaxy">galaxy</Button>
			<Button icon="fas fa-handshake-angle" link="/hire-me">hire me</Button>
		</div>
	</div>
	<hr class="absolute bottom-0 left-0 right-0 opacity-25" />
</nav>

<style lang="postcss">
	a {
		text-decoration: none;
	}
	nav {
		@apply sticky left-0 top-0 z-50 w-full bg-transparent px-4 py-2;
		backdrop-filter: blur(5px);
	}
</style>
