<script lang="ts">
	import { clerkUser } from '$web/stores/clerk';
	import type { UserResource } from '@clerk/types';

	export let size: any = '38px';

	function getURL(user: UserResource) {
		if (user.profileImageUrl) {
			return user.profileImageUrl;
		}

		return `https://avatars.dicebear.com/api/bottts/${user.id}.svg`;
	}
</script>

{#if $clerkUser.user}
	<img
		class="rounded-full"
		src={getURL($clerkUser.user)}
		alt="{$clerkUser.user.id}'s avatar"
		width={size}
		height={size}
	/>
{/if}
