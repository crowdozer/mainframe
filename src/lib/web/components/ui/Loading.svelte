<script lang="ts">
	import Spinner from './Spinner.svelte';

	export let size: any = '2.5em';
</script>

<div class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center align-middle">
	<Spinner {size} />
</div>
