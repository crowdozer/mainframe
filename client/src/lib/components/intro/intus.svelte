<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { sleep } from '../../utils/sleep';
	import { getRandomInt } from '../../utils/random-int';

	// the original text, from liber primus
	const text = `WELCOME PILGRIM TO THE GREAT JOVRNEY TOWARD THE END OF ALL THNGS
IT IS NOT AN EASY TRIP BVT FOR THOSE WHO FIND THEIR WAY HERE IT IS A NECESSARY ONE
ALONG THE WAY YOV WILL FIND AN END TO ALL STRVGGLE AND SVFFERNG YOVR INNOCENCE YOVR ILLVSIANS YOVR CERTAINTY AND YOVR REALITY
VLTIMATELY YOV WILL DISCOVER AN END TO SELF
IT IS THROVGH THIS PILGRIMAGE THAT WE SHAPE OVRSELVES AND OVR REALITIES
JOVRNEY DEEP WITHIN AND YOV WILL ARRIVE OVTSIDE
LICE THE INSTAR IT IS ONLY THROVGH GONG WITHIN THAT WE MAY EMERGE`;

	// contains the output
	const textStore = writable('');

	// how many seconds should it take to reveal everything
	const revealDurationSeconds = 20;

	// animates in the text
	async function animateText() {
		// how long each letter must sleep to meet the reveal duration
		const sleepDuration = (revealDurationSeconds * 1000) / text.length;

		for (let i = 0; i < text.length; i++) {
			let character = text[i];

			// obscure text into 1's and 0's
			const obscured = character.charCodeAt(0) & 0x01;

			// if it's a newline char, don't obscure it
			const render = character === '\n' ? character : obscured;

			// add the obscured char and sleep
			textStore.update((oldText) => oldText + render);
			await sleep(sleepDuration);

			if (character === '\n') {
				// sleep longer on newline
				await sleep(500);
				// continue so the remaining reveal logic doesn't apply to newline
				continue;
			}

			// after a random duration between 1s and 3s, reveal the 0/1 to its ascii
			setTimeout(() => {
				textStore.update((oldText) => {
					const temp = [...oldText];
					temp[i] = character;
					return temp.join('');
				});
			}, getRandomInt(1000, 3000));
		}
	}

	onMount(() => {
		animateText();
	});
</script>

<h2
	class="text-lg font-bold mb-64 text-green-600 whitespace-pre-line break-all heading"
	style="height: 310px"
>
	{$textStore.trim()}<span class="cursor">█</span>
</h2>

<style>
	.cursor {
		opacity: 1;
		animation: flash 0.5s linear infinite;
	}
	@keyframes flash {
		0% {
			opacity: 1;
		}
		49% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
</style>
