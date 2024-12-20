<script lang="ts">
	import type { LetterData } from '$lib/utils/letterDataUtils';
	import { afterUpdate } from 'svelte';
	import Letter from './Letter.svelte';

	export let letters: LetterData[];
	export let isHand = true;
	export let moveLetter: (toPlayed: boolean, index: number) => void;
	export let wrongGuess = false;

	let container: HTMLElement;

	afterUpdate(() => {
		if (letters) scrollToBottom(container);
	});

	const scrollToBottom = (node: HTMLElement) => {
		node.scrollLeft = node.scrollWidth;
	};
</script>

<div class="relative">
	<!-- Blur effect for wrong guesses -->
	<div
		class="absolute inset-0 m-auto w-96 rounded-md bg-red-500 blur-md transition-all"
		class:opacity-100={wrongGuess}
		class:opacity-0={!wrongGuess}
	/>

	<div
		bind:this={container}
		class="mv-2 relative m-auto flex min-h-[84px] w-96 touch-pan-x snap-x overflow-x-hidden overscroll-contain rounded-md border-2 bg-bg p-2 transition-all"
		class:animate-shake={wrongGuess}
		class:border-red-400={wrongGuess}
	>
		{#each letters as letter, index}
			<Letter {letter} on:mousedown={() => moveLetter(isHand, index)} />
		{/each}
	</div>
</div>
