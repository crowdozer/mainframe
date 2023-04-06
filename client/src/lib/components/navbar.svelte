<script>
	import Button from './button.svelte';
</script>

<nav class="relative">
	<div class="max-w-6xl flex mx-auto">
		<!-- Logo -->
		<div class="inline-flex items-center">
			<h1 class="text-xl font-bold">
				<a href="/">crwdzr.io</a>
			</h1>
		</div>

		<!-- Buttons -->
		<div class="inline-flex items-center ml-auto">
			<Button icon="fab fa-github" link="https://www.github.com/crowdozer">git</Button>
			<Button icon="fas fa-user-astronaut" link="/galaxy">galaxy</Button>
			<Button icon="fas fa-handshake-angle" link="/resume">hire me</Button>
		</div>
	</div>
	<hr class="opacity-25 absolute bottom-0 left-0 right-0" />
</nav>

<style lang="postcss">
	a {
		text-decoration: none;
	}
	nav {
		@apply sticky top-0 left-0 w-full py-2 px-4 z-50 bg-transparent;
		backdrop-filter: blur(5px);
	}
</style>
