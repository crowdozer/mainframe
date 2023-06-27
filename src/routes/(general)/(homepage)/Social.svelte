<script lang="ts">
	export let header: string;
	export let subheader: string;
	export let icon: string;
	export let url: string;
</script>

<a
	href={url}
	target="_blank"
	rel="noopener noreferrer"
	class="btn flex cursor-pointer flex-row gap-8 border border-stone-800 bg-transparent hover:border-stone-700 hover:bg-transparent"
>
	<i class="fa-fw text-4xl text-primary-500 {icon}" />
	<div class="flex grow flex-col text-left">
		<p class="m-0">{header}</p>
		<p class="m-0 text-stone-400">{subheader}</p>
	</div>
</a>
