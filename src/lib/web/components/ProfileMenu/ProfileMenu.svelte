<script>
	import Button from '$web/components/ui/Button/Button.svelte';
	import Avatar from '$web/components/ui/Avatar.svelte';
	import { clerkInstance, clerkUser } from '$web/stores/clerk';

	function handleSignIn() {
		$clerkInstance.openSignIn();
	}

	async function handleSignOut() {
		if (window.confirm('Sign out?')) {
			await $clerkInstance.signOut();
			window.location.reload();
		}
	}
</script>

<div class="root relative">
	{#if $clerkUser.user}
		<button class="avatar peer align-middle" on:click={handleSignOut}>
			<Avatar />
		</button>
	{:else}
		<div class="peer">
			<Button icon="fas fa-bars" />
		</div>
	{/if}
	<div
		class="menu absolute right-0 top-10 hidden w-[200px] flex-col overflow-hidden rounded-xl bg-neutral-900 drop-shadow-lg hover:block peer-hover:block"
	>
		<div class="flex flex-col gap-1">
			<Button icon="fas fa-user-astronaut" link="/galaxy">galaxy</Button>
			<Button icon="fas fa-person-rifle" link="/gates-of-hell">ostfront</Button>
			<Button icon="fas fa-database" link="/redis">redis</Button>
			{#if $clerkUser.user}
				<Button icon="fas fa-sign-out" on:click={handleSignOut}>Sign Out</Button>
			{:else}
				<Button icon="fas fa-user" on:click={handleSignIn}>Sign In</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	.menu {
		z-index: 999;
	}
	.root:hover .menu {
		z-index: 999;
		display: block;
	}
</style>
