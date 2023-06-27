<script>
	import Item from './Item.svelte';
	import Tech from './Tech.svelte';
	import Social from './Social.svelte';
</script>

<svelte:head>
	<title>Let's build something</title>
</svelte:head>

<div class="mx-2 my-16 sm:mx-4 md:my-32">
	<div class="mx-auto max-w-xl">
		<div class="flex flex-col gap-32 md:gap-48">
			<div>
				<h1>👋 hi there</h1>
				<h4 class="mt-8">I'm a developer based out of St. Louis</h4>
				<div class="mt-8 flex flex-col gap-2">
					<Social
						header="dev.to"
						subheader="crowdozer"
						icon="fa-brands fa-dev"
						url="https://dev.to/crowdozer"
					/>
					<Social
						header="github"
						subheader="crowdozer"
						icon="fa-brands fa-github"
						url="https://github.com/crowdozer"
					/>
					<Social
						header="twitch"
						subheader="crowdozer"
						icon="fa-brands fa-twitch"
						url="https://www.twitch.tv/crowdozer"
					/>
					<Social
						header="twitter"
						subheader="crowdoze"
						icon="fa-brands fa-twitter"
						url="https://twitter.com/crowdoze"
					/>
				</div>
			</div>

			<div>
				<h2>
					🧪 tech <span class="text-darker mt-8 text-sm">by usage, not proficiency</span>
				</h2>
				<hr />

				<div class="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
					<Tech name="JS/TS" icon="fa-brands fa-js" level={5} />
					<Tech name="React" icon="fa-brands fa-react" level={4} />
					<Tech name="MySQL" icon="fas fa-cloud" level={4} />
					<Tech name="NextJS" level={4} />
					<Tech name="SvelteKit" level={3} />
					<Tech name="Docker" level={3} />
				</div>
			</div>

			<div>
				<h2>🏆 public projects</h2>
				<hr />
				<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-1">
					<Item
						link="https://www.luxorts.com"
						title="luxorts"
						description="luxury condo rental website for Luxorts"
					/>
					<Item
						link="https://github.com/crowdozer/mainframe"
						title="crwdzr.io"
						description="free and public source on github"
					/>
					<Item
						link="https://galactus-snowy.vercel.app/"
						title="galactus"
						description="ascii galaxy sim"
					/>
				</div>
			</div>

			<div>
				<h2>🔒 private projects</h2>
				<hr />
				<div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-1">
					<Item
						link="https://portal.luxorts.com/"
						title="luxorts CMS"
						description="in house CMS with a secure web interface"
					/>
					<Item title="leads system" description="high volume intake and distribution system" />
					<Item
						title="timeshare release system"
						description="confidential client agreements for timeshare exiting"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	hr {
		@apply mt-2;
	}
</style>
