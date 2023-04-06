<script lang="ts">
	export let checked: boolean;
	export let label: string = '';
	export let title: string = '';
</script>

<label class="relative inline-flex items-center cursor-pointer" {title}>
	<input type="checkbox" class="sr-only peer" bind:checked />
	<div
		class="
            w-11
            h-6
            rounded-full
            bg-gray-900

            after:content-['']
            after:absolute
            after:top-[2px]
            after:left-[2px]
            after:bg-green-500
            after:border-green-950
            after:border
            after:rounded-full
            after:h-5
            after:w-5
            after:transition-all

            peer
            peer-checked:bg-green-950
            peer-checked:after:translate-x-full
            peer-checked:after:border-green-950
            peer-focus:outline-none
            peer-focus:ring-4
            peer-focus:ring-green-800"
	/>
	{#if label}
		<span
			class="
            ml-3
            text-sm
            font-medium
            text-gray-300
            ">{label}</span
		>
	{/if}
</label>
