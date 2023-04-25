<script>
	import Button from '$web/components/ui/Button/Button.svelte';
	import Avatar from '$web/components/ui/Avatar.svelte';
	import { clerkInstance, clerkUser } from '$web/stores/clerk';

	function handleSignIn() {
		$clerkInstance.openSignIn()
	}

	async function handleSignOut() {
		if (window.confirm('Sign out?')) {
			await $clerkInstance.signOut()
			window.location.reload()
		}
	}
</script>

{#if $clerkUser.user}
    <button class="hover:cursor-pointer" on:click={handleSignOut}>
        <Avatar />
    </button>
{:else}
    <Button icon="fas fa-user" on:click={handleSignIn} />
{/if}