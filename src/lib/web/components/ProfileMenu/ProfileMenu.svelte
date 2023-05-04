<script lang="ts">
	import Avatar from '$web/components/ui/Avatar.svelte';
	import { clerkInstance, clerkUser } from '$web/stores/clerk';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	function handleSignIn() {
		$clerkInstance.openSignIn();
	}

	async function handleSignOut() {
		if (window.confirm('Sign out?')) {
			await $clerkInstance.signOut();
			window.location.reload();
		}
	}

	const links = [
		['/hire-me', 'fas fa-handshake-angle mr-1', 'Hire me'],
		['https://github.com/crowdozer/mainframe', 'fab fa-github', 'Github'],
		['/galaxy', 'fas fa-user-astronaut', 'Galaxy', 'Galaxy'],
		['/gates-of-hell', 'fas fa-person-rifle', 'Ostfront'],
		['/redis', 'fas fa-database', 'Redis'],
		['/spotify', 'fab fa-spotify', 'Spotify'],
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
			<hr class="mt-1" />
			<li class="mt-1">
				{#if $clerkUser.user}
					<a href="#" on:click={handleSignOut}>
						<span class="badge"><i class="fas fa-sign-out" /></span>
						<span class="flex-auto">Sign Out</span>
					</a>
				{:else}
					<a href="#" on:click={handleSignIn}>
						<span class="badge"><i class="fas fa-user" /></span>
						<span class="flex-auto">Sign In</span>
					</a>
				{/if}
			</li>
		</ul>
	</div>
</div>
