<script lang="ts">
	import { clerkUser } from '$web/stores/clerk';
	import type { UserResource } from '@clerk/types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let size: any = '42px';

	function getURL(user: UserResource) {
		if (user.profileImageUrl) {
			return user.profileImageUrl;
		}

		return `https://avatars.dicebear.com/api/bottts/${user.id}.svg`;
	}
</script>

<div class="avatar flex" style="width: {size}; height: {size}">
	{#if $clerkUser.user}
		<Avatar
			border="border-4 border-surface-300-600-token hover:!border-primary-500"
			cursor="cursor-pointer"
			src={getURL($clerkUser.user)}
			width={size}
		/>
	{:else}
		<button class="btn btn-icon variant-ringed-secondary hover:ring-2">
			<i class="fas fa-user" />
		</button>
	{/if}
</div>
