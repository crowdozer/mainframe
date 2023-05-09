<script>
	import AsciiRipple from '$web/components/AsciiRipple/AsciiRipple.svelte';
	import Container from '$web/components/ui/Container.svelte';
	import CopyClick from '$web/components/ui/CopyClick.svelte';
	import Paper from '$web/components/ui/Paper.svelte';
	// import Tag from '$web/components/ui/Tag.svelte';

	// const frameworks = [
	// 	'Express',
	// 	'React 16-18',
	// 	'Svelte',
	// 	'Svelte-Kit',
	// 	'NextJS',
	// 	'Codeigniter',
	// 	'Laravel',
	// 	'Frameworkless',
	// ];

	// const databases = ['MySQL (MariaDB, CloudSQL)', 'Firebase', 'Supabase', 'MongoDB', 'ArangoDB'];

	// const servers = [
	// 	'DigitalOcean',
	// 	'AWS',
	// 	'Google Cloud',
	// 	'Kubernetes',
	// 	'Serverless/Cloud Functions',
	// 	'Vercel/Netlify',
	// ];

	// const otherTech = [
	// 	'API Integration (JWT/JSON, SOAP, AJAX)',
	// 	'Webhosting (DigitalOcean, Netlify, Vercel)',
	// 	'CI/CD (Testing, Deployment, Images)',
	// 	'Error monitoring (Sentry)',
	// 	'SSH, FTP, SFTP, Linux Terminal, WSL',
	// 	'Google maps and other geolocation APIs',
	// 	'Socket.io integrations for server/client',
	// 	'Stripe integrations for server/client',
	// ];

	// const coolStuff = [
	// 	'Data Visualization',
	// 	'Automation',
	// 	'Composability',
	// 	'Optimization',
	// 	'Idempotency',
	// 	'Cryptography, Steganography',
	// 	'Generative AI (Text and Images)',
	// 	'Event Sourcing',
	// ];
</script>

<svelte:head>
	<title>hire me</title>
</svelte:head>

<div class="relative mx-auto max-w-7xl py-8 md:py-32">
	<AsciiRipple />

	<Container>
		<h1 class="text-9xl font-bold">Let's work together</h1>
		<h2 class="mt-8 text-surface-700-200-token">
			6+ years of experience delivering rich user experiences, full stack
		</h2>

		<div class="mt-8 md:mt-32">
			<div
				class="tech_icons mt-4 flex flex-col flex-wrap justify-center gap-2 gap-y-1 md:flex-row md:gap-16 md:gap-y-8"
			>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fa-brands fa-js text-primary-500" />
					JS/TS
				</span>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fa-brands fa-react text-primary-500" />
					React & Next
				</span>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fa-brands fa-docker text-primary-500" />
					Docker & K8S
				</span>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fa-brands fa-aws text-primary-500" />
					AWS
				</span>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fa-brands fa-google text-primary-500" />
					GCP
				</span>
				<span class="btn justify-start md:variant-ringed-primary md:justify-center">
					<i class="fas fa-cloud text-primary-500" />
					Serverless
				</span>
			</div>
		</div>
	</Container>
</div>

<Container>
	<h1>Here's what I've built</h1>

	<div class="mt-8 flex flex-col gap-16 md:mt-16">
		<div>
			<div class="flex flex-col gap-4">
				<h3>
					<a href="https://www.luxorts.com/" target="_blank" rel="noopener noreferrer">
						www.luxorts.com
					</a>
				</h3>
				<p>
					Luxorts offers a luxury condo rental service. I helped them build a web presence with
					NextJS and Express. Features include detailed listing pages, stripe integration for
					payments, realtime chat, a responsive mobile first design, and an easy to use dashboard.
					The back end also delivers complex popularity, feature and distance based geo queries for
					the web client.
				</p>
			</div>
		</div>

		<div>
			<div class="flex flex-col gap-4">
				<h3 class="text-surface-700-200-token">Proprietary CMS</h3>
				<p>
					I helped migrate data from excel sheets into into a rich sql driven cms. It was designed
					and built from the ground up to perform extremely specific business logic. Example
					features include a rich permissions based auth system, tools to track timepunches for each
					week, tools to send and receive forms from clients and complex reports for tracking
					business data.
				</p>
			</div>
		</div>

		<div>
			<div class="flex flex-col gap-4">
				<h3 class="text-surface-700-200-token">Proprietary Leads System</h3>
				<p>
					I redesigned a timeshare exit companies overstressed leads system. I redesigned and
					optimized their round robins, reducing reads and writes by a factor of almost 100. We
					removed countless bugs by consolidating scattered business logic into a simple, uniform,
					robust server.
				</p>
			</div>
		</div>
	</div>

	<div class="mt-16 md:mt-32">
		<Paper bordered>
			<div class="p-4">
				<h3 class="mb-4 text-xl">want to work together?</h3>
				<p class="mono"><CopyClick text="business@crwdzr.io" /></p>
			</div>
		</Paper>
	</div>
</Container>

<style lang="postcss">
	.tech_icons i {
		@apply mr-4 text-4xl;
		width: 4rem;
	}
	.tech_icons span {
		@apply flex flex-row items-center text-xl text-surface-700-200-token;
	}
</style>
