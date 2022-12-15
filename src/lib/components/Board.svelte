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
		class="absolute inset-0 m-auto w-96 rounded-md bg-red-500 blur-md
				{wrongGuess ? 'opacity-100' : 'opacity-0'}
				transition-all"
	/>

	<div
		bind:this={container}
		class="mv-2 relative m-auto flex min-h-[84px] w-96 overflow-x-hidden rounded-md border-2 bg-bg p-2
		{wrongGuess && 'animate-shake border-red-400'} transition-all"
	>
		{#each letters as letter, index}
			<Letter {letter} on:click={() => moveLetter(isHand, index)} />
		{/each}
	</div>
</div>
