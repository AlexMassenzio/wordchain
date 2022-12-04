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

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ left: node.scrollWidth, behavior: 'smooth' });
	};
</script>

<div class="relative">
	<!-- Blur effect for wrong guesses -->
	<div
		class="absolute w-96 inset-0 m-auto bg-red-500 rounded-md blur-md
				{wrongGuess ? 'opacity-100' : 'opacity-0'}
				transition-all"
	/>

	<div
		bind:this={container}
		class="relative bg-bg flex m-auto w-96 mv-2 min-h-[84px] rounded-md border-2 p-2 overflow-x-hidden
		{wrongGuess && 'animate-shake border-red-400'} transition-all"
	>
		{#each letters as letter, index}
			<Letter {letter} on:click={() => moveLetter(isHand, index)} />
		{/each}
	</div>
</div>
