<script lang="ts">
	import type { LetterData } from '$lib/utils/letterDataUtils';
	import Letter from './Letter.svelte';

	export let letters: LetterData[];
	export let isHand: boolean = true;
	export let moveLetter: (toPlayed: boolean, index: number) => void;
</script>

<div class="flex border-2 p-2 flex-wrap">
	{#each letters as letter, index}
		<Letter {letter} on:click={() => moveLetter(isHand, index)} />
	{/each}
</div>
