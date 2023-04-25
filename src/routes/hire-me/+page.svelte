<script>
	import Container from '$web/components/ui/Container.svelte';
	import CopyClick from '$web/components/ui/CopyClick.svelte';
	import Paper from '$web/components/ui/Paper.svelte';
	import Tag from '$web/components/ui/Tag.svelte';

	const frameworks = [
		'Express',
		'React 16-18',
		'Svelte',
		'Svelte-Kit',
		'NextJS',
		'Codeigniter',
		'Laravel',
		'Frameworkless'
	];

	const databases = ['MySQL (MariaDB, CloudSQL)', 'Firebase', 'Supabase', 'MongoDB', 'ArangoDB'];

	const servers = [
		'DigitalOcean',
		'AWS',
		'Google Cloud',
		'Kubernetes',
		'Serverless/Cloud Functions)'
	];

	const otherTech = [
		'API Integration (JWT/JSON, SOAP, AJAX)',
		'Webhosting (DigitalOcean, Netlify, Vercel)',
		'CI/CD (Testing, Deployment, Images)',
		'Error monitoring (Sentry)',
		'SSH, FTP, SFTP, Linux Terminal, WSL',
		'Google maps and other geolocation APIs',
		'Socket.io integrations for server/client',
		'Stripe integrations for server/client'
	];

	const coolStuff = [
		'Data Visualization',
		'Automation',
		'Composability',
		'Optimization',
		'Idempotency',
		'Cryptography, Steganography',
		'Generative AI (Text and Images)',
		'Event Sourcing'
	];

	const experience = [
		{
			title: 'Luxorts LLC - Full Stack Developer (2 years)',
			link: 'https://www.luxorts.com/',
			text:
				'I designed and built a luxury condo rental website for Luxorts. ' +
				'It features both regional and popularity based filtering, complex geolocation queries, ' +
				'stripe API integration for checkouts, realtime chat, and a responsive mobile first design. ' +
				'I also integrated the Luxorts API into existing CMS systems.'
		},
		{
			title: 'We the Family Resorts - Full Stack Developer (2 years)',
			text:
				'In this position, I helped maintain and update legacy code while developing new in-house tools. ' +
				'I designed a high volume leads intake and distribution system for a call center with external API support. ' +
				'I also assisted in optimizing legacy cloud functions, reducing server reads ' +
				'by nearly a factor of 100.'
		},
		{
			title: 'Vacation Management Group - Full Stack Developer (2 years)',
			text:
				'I worked closely with management to design and build an in-house CMS ' +
				'to replace excel databases. In addition to better performance and ' +
				'adding complex data visualization, I implemented comprehensive business logic, ' +
				' a robust user permissions system, and integrated with several external APIs (soap, xml, json). ' +
				' I also automated and optimized many in-office processes, cutting the workload by a factor of 10 in some cases.'
		}
	];

	const education = [
		{
			title: 'AAS Web Design - Jefferson College, MO',
			text:
				'I graduated from Jefferson College in 2015. ' +
				'I primarily studied PHP, Javascript, SQL, and graphic design.'
		}
	];
</script>

<svelte:head>
	<title>hire me</title>
</svelte:head>

<Container>
	<div class="mb-4">
		<Paper bordered>
			<div class="p-4">
				<h1 class="mb-4 text-xl">want to work together?</h1>
				<p class="mono"><CopyClick text="business@crwdzr.io" /></p>
			</div>
		</Paper>
	</div>
	<div class="mb-4">
		<Paper bordered>
			<div class="p-8">
				<!-- Header -->
				<h1 class="mb-2 text-3xl font-bold underline decoration-dotted underline-offset-8">
					Full Stack Developer
				</h1>

				<!-- Summary -->
				<div>
					<h2 class="mb-2 mt-12 text-2xl font-semibold">
						<Tag text="h2" open />Summary<Tag text="h2" />
					</h2>
					<p>
						Over half a decade of experience in a wide array of web technologies, including
						JS/NodeJS, PHP, React, NextJS, Svelte, and even JQuery. I have a comprehensive skill set
						that enables rapid adaptation to challenges and the development of innovative solutions.
						I bring strong problem-solving and exceptional debugging abilities for multiple JS and
						PHP frameworks, cloud platforms, and databases. My familiarity with web hosting, CI/CD
						processes, and error monitoring brings a well-rounded and valuable set of skills to any
						project or team.
					</p>
				</div>

				<!-- Skills -->
				<h2 class="mb-2 mt-12 text-2xl font-semibold">
					<Tag text="h2" open />Skills<Tag text="h2" />
				</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div>
						<h3 class="font-semibold">Frameworks</h3>
						<ul>
							{#each frameworks as framework}
								<li>{framework}</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3 class="font-semibold">Databases</h3>
						<ul>
							{#each databases as db}
								<li>{db}</li>
							{/each}
						</ul>
					</div>
					<div>
						<h3 class="font-semibold">Servers</h3>
						<ul>
							{#each servers as server}
								<li>{server}</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
					<div>
						<h3 class="font-semibold">Miscellaneous</h3>
						<ul>
							{#each otherTech as tech}
								<li>{tech}</li>
							{/each}
						</ul>
					</div>

					<div>
						<h3 class="font-semibold">Cool Stuff</h3>
						<ul>
							{#each coolStuff as stuff}
								<li>{stuff}</li>
							{/each}
						</ul>
					</div>
				</div>

				<!-- Experience -->
				<h2 class="mb-2 mt-12 text-2xl font-semibold">
					<Tag text="h2" open />Experience<Tag text="h2" />
				</h2>
				{#each experience as job}
					<div class="py-2">
						<p>
							<strong class="text-gray-300">{job.title}</strong>
							{#if job.link}
								<br />
								<a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a>
							{/if}
						</p>
						<p>
							{job.text}
						</p>
					</div>
				{/each}

				<!-- Education -->
				<h2 class="mb-2 mt-12 text-2xl font-semibold">
					<Tag text="h2" open />Education<Tag text="h2" />
				</h2>
				{#each education as educate}
					<div class="py-2">
						<p>
							<strong class="text-gray-300">{educate.title}</strong>
						</p>
						<p>
							{educate.text}
						</p>
					</div>
				{/each}
			</div>
		</Paper>
	</div>
</Container>
