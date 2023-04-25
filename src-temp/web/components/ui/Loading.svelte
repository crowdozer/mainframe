<script lang="ts">
	import Spinner from "./Spinner.svelte";

    export let size: any = "2.5em" 
</script>

<div class="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center align-middle">
    <Spinner size={size} />
</div>