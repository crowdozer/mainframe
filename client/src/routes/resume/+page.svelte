<script>
	import Container from '../../components/container.svelte';
	import Paper from '../../components/paper.svelte';
	import Tag from '../../components/tag.svelte';

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
</script>

<Container>
	<Paper>
		<div class="p-8">
			<!-- Header -->
			<h1 class="text-3xl font-bold underline decoration-dotted underline-offset-8 mb-2">
				<span class="chevron">></span> Full Stack Developer
			</h1>

			<!-- Summary -->
			<div>
				<h2 class="text-2xl font-semibold mt-12 mb-2">
					<Tag text="h2" open />Summary<Tag text="h2" />
				</h2>
				<p>
					Over half a decade of experience in a wide array of web technologies, including JS/NodeJS,
					PHP, React, NextJS, Svelte, and even JQuery. I have a comprehensive skill set that enables
					rapid adaptation to challenges and the development of innovative solutions. I bring strong
					problem-solving and exceptional debugging abilities for multiple JS and PHP frameworks,
					cloud platforms, and databases. My familiarity with web hosting, CI/CD processes, and
					error monitoring brings a well-rounded and valuable set of skills to any project or team.
				</p>
			</div>

			<!-- Skills -->
			<h2 class="text-2xl font-semibold mt-12 mb-2">
				<Tag text="h2" open />Skills<Tag text="h2" />
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<h3 class="font-semibold">Frameworks</h3>
					<ul>
						{#each frameworks as framework}
							<li><span class="chevron">></span> {framework}</li>
						{/each}
					</ul>
				</div>
				<div>
					<h3 class="font-semibold">Databases</h3>
					<ul>
						{#each databases as db}
							<li><span class="chevron">></span> {db}</li>
						{/each}
					</ul>
				</div>
				<div>
					<h3 class="font-semibold">Servers</h3>
					<ul>
						{#each servers as server}
							<li><span class="chevron">></span> {server}</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
				<div>
					<h3 class="font-semibold">Miscellaneous</h3>
					<ul>
						{#each otherTech as tech}
							<li><span class="chevron">></span> {tech}</li>
						{/each}
					</ul>
				</div>

				<div>
					<h3 class="font-semibold">Cool Stuff</h3>
					<ul>
						{#each coolStuff as stuff}
							<li><span class="chevron">></span> {stuff}</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Experience -->
			<h2 class="text-2xl font-semibold mt-12 mb-2">
				<Tag text="h2" open />Experience<Tag text="h2" />
			</h2>
			<p>
				<strong class="text-gray-300">Full Stack Developer (6 years) - Luxorts LLC</strong>
				<br />
				<a href="https://www.luxorts.com/" target="_blank" rel="noopener noreferrer"
					>https://www.luxorts.com/</a
				>
			</p>
			<p>
				I was a full stack developer at Luxorts (previously “We the Family Resorts” and “Vacation
				Management Group”) for roughly 6 years. In this position, I worked closely with management
				to design and build a complex in-house CMS (client & server), a luxury vacation condo rental
				website, and various other supporting softwares.
			</p>

			<!-- Education -->
			<h2 class="text-2xl font-semibold mt-12 mb-2">
				<Tag text="h2" open />Education<Tag text="h2" />
			</h2>
			<p>
				<strong class="text-gray-300">AAS Web Design - Jefferson College, MO</strong>
				<br />
				I received my Associates of Applied Science in web design from Jeffco in 2015. I have since been
				learning and working in the field.
			</p>
		</div>
	</Paper>
</Container>

<style>
	.chevron {
		color: #ababab;
	}
</style>
