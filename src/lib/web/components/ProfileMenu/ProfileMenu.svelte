<script>
	import Button from '$web/components/ui/Button.svelte';
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

<div class="dropdown-end dropdown">
	<label for="menu" tabIndex={0} class="btn-ghost btn-circle btn">
		{#if $clerkUser.user}
			<Avatar />
		{:else}
			<i class="fas fa-user" />
		{/if}
	</label>

	<ul
		tabIndex={0}
		class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-zinc-900 p-2 shadow"
	>
		<li>
			<a href="https://www.github.com/crowdozer" rel="noopener noreferrer" target="_blank">
				<i class="fab fa-fw fa-github" />
				Github
			</a>
		</li>
		<li>
			<a class="justify-between" href="/hire-me">
				<div>
					<i class="fas fa-fw fa-handshake-angle mr-1" />
					Hire Me
				</div>
				<span class="badge-success badge">avail</span>
			</a>
		</li>
		<li>
			<a href="/galaxy">
				<i class="fas fa-fw fa-user-astronaut" />
				Galaxy
			</a>
		</li>
		<li>
			<a href="/gates-of-hell">
				<i class="fas fa-fw fa-person-rifle" />
				Ostfront
			</a>
		</li>
		<li>
			<a href="/redis">
				<i class="fas fa-fw fa-database" />
				Redis
			</a>
		</li>
		<hr class="my-2" />
		<li>
			{#if $clerkUser.user}
				<button on:click={handleSignOut}>
					<i class="fas fa-fw fa-sign-out" />
					Sign Out
				</button>
			{:else}
				<button on:click={handleSignIn}>
					<i class="fas fa-fw fa-user" />
					Sign In
				</button>
			{/if}
		</li>
	</ul>
</div>
