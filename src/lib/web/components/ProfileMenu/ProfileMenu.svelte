<script lang="ts">
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import Avatar from '$web/components/ui/Avatar.svelte';

	const links = [
		['https://github.com/crowdozer/mainframe', 'fab fa-github', 'Github'],
		['/feed', 'fas fa-rss', 'RSS Feeds'],
		['/gates-of-hell', 'fas fa-person-rifle', 'Ostfront'],
	];

	let popupSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'click',
		// Provide a matching 'data-popup' value.
		target: 'profile',
	};
</script>

<div>
	<div use:popup={popupSettings}>
		<Avatar />
	</div>

	<div data-popup="profile" class="card absolute right-0 top-10 z-10 w-52 p-2">
		<!-- Append the arrow element -->
		<div class="arrow variant-filled-surface" />

		<ul class="list-nav">
			{#each links as link}
				<li class="mt-1">
					<a
						class="no-underline"
						href={link[0]}
						target={link[0][0] !== '/' ? '_blank' : ''}
						rel={link[0][0] !== '/' ? 'noopener noreferrer' : ''}
					>
						<span class="badge"><i class={link[1]} /></span>
						<span class="flex-auto">{link[2]}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
