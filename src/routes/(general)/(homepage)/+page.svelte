<script>
	import Container from '$web/components/ui/Container.svelte';
	import CopyClick from '$web/components/ui/CopyClick.svelte';
	import Item from './Item.svelte';
</script>

<svelte:head>
	<title>Let's build something</title>
</svelte:head>

<div class="my-32">
	<Container>
		<div class="flex flex-col gap-32">
			<div>
				<h2 class="text-lg">projects</h2>
				<div class="mt-8 grid grid-cols-2 gap-4">
					<Item
						link="https://www.luxorts.com"
						title="luxorts"
						description="luxury condo rental website for Luxorts"
					/>
					<Item
						link="https://portal.luxorts.com/"
						title="luxorts CMS"
						description="in house CMS with a secure web interface"
					/>
					<Item
						link="https://www.crwdzr.io"
						title="crwdzr.io"
						description="free and public source on github"
					/>
					<Item
						link="https://galactus-snowy.vercel.app/"
						title="galactus"
						description="ascii galaxy sim"
					/>
					<Item title="leads system" description="high volume intake and distribution system" />
					<Item
						title="timeshare release system"
						description="confidential client agreements for timeshare exiting"
					/>
				</div>
			</div>

			<div>
				<h2 class="text-lg">tech</h2>
				<div class="mt-8 flex flex-col flex-wrap gap-2 gap-y-1 md:flex-row md:gap-2 md:gap-y-2">
					<div class="tech btn">
						<i class="fa-brands fa-js text-primary-500" /> JS/TS
					</div>
					<div class="tech btn">
						<i class="fa-brands fa-react text-primary-500" /> React & Next
					</div>
					<div class="tech btn">
						<i class="fa-brands fa-docker text-primary-500" /> Docker & K8S
					</div>
					<div class="tech btn">
						<i class="fa-brands fa-aws text-primary-500" /> AWS
					</div>
					<div class="tech btn">
						<i class="fa-brands fa-google text-primary-500" /> GCP
					</div>
					<div class="tech btn">
						<i class="fas fa-cloud text-primary-500" /> MySQL
					</div>
					<div class="tech btn">Firebase</div>
					<div class="tech btn">MongoDB</div>
					<div class="tech btn border-none text-stone-500">and more</div>
				</div>
			</div>

			<div class="p-4">
				<h3 class="mb-4 text-xl">want to work together?</h3>
				<p class="mono">
					<CopyClick text="business@crwdzr.io" />
				</p>
			</div>
		</div>
	</Container>
</div>

<style lang="postcss">
	.tech {
		@apply inline-block rounded border border-stone-700 p-2 text-xl;
	}
</style>
