<script>
	import Button from './button.svelte';
</script>

<nav
	class="sticky top-0 left-0 w-full py-2 px-4 z-50 bg-transparent border-b border-dashed border-color-main-text"
>
	<div class="max-w-6xl flex mx-auto">
		<!-- Logo -->
		<div class="inline-flex items-center">
			<h1 class="text-xl font-bold text-color-main-text">
				<a href="/">crwdzr.io</a>
			</h1>
		</div>

		<!-- Buttons -->
		<div class="inline-flex items-center ml-auto">
			<Button icon="fab fa-github" link="https://www.github.com/crowdozer">git</Button>
			<Button icon="fas fa-user-astronaut" link="/galaxy">Space</Button>
			<Button icon="fas fa-scroll" link="/resume">resume</Button>
		</div>
	</div>
</nav>

<style>
	a {
		text-decoration: none;
	}
	nav {
		backdrop-filter: blur(5px);
	}
	.border-color-main-text {
		border-color: var(--main-text-color);
	}
	.text-color-main-text {
		color: var(--main-text-color);
	}
</style>
