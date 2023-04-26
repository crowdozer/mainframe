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
	<div class="avatar flex" style="width: {size}; height: {size}">
		<div class="rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
			<img
				id="avatar"
				src={getURL($clerkUser.user)}
				alt="{$clerkUser.user.id}'s avatar"
				width={size}
				height={size}
			/>
		</div>
	</div>
{/if}
