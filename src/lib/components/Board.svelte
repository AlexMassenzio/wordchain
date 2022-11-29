<script lang="ts">
	import type { LetterData } from '$lib/utils/letterDataUtils';
	import { afterUpdate } from 'svelte';
	import Letter from './Letter.svelte';

	export let letters: LetterData[];
	export let isHand = true;
	export let moveLetter: (toPlayed: boolean, index: number) => void;

	let container: HTMLElement;

	afterUpdate(() => {
		if (letters) scrollToBottom(container);
	});

	const scrollToBottom = async (node: HTMLElement) => {
		node.scroll({ left: node.scrollWidth, behavior: 'smooth' });
	};
</script>

<div
	bind:this={container}
	class="flex m-auto w-96 mv-2 min-h-[84px] border-2 p-2 overflow-x-hidden"
>
	{#each letters as letter, index}
		<Letter {letter} on:click={() => moveLetter(isHand, index)} />
	{/each}
</div>
