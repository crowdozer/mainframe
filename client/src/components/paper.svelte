<div class="inline-block h-full w-full relative border border-dashed border-gray-600 content">
	<slot />
</div>

<style>
	.content::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		backdrop-filter: blur(10px);
	}
</style>
