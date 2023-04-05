<script lang="ts">
	import { onMount } from 'svelte';
	import Container from '../components/container.svelte';
	import Paper from '../components/paper.svelte';
	import Intro from '../components/intro/intro.svelte';
</script>

<Container>
	<!-- Hero section -->
	<div class="my-32">
		<Intro />
	</div>

	<div>
		<Paper>
			<div class="p-8">There isn't anything to do here, yet.</div>
		</Paper>
	</div>
</Container>
