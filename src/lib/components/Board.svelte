<script lang="ts">
	import Letter from './Letter.svelte';

	export let isHand: boolean = true;
	export let letters: string[];
	export let moveLetter: any;
</script>

<div class="flex border-2 p-2">
	{#each letters as letter, index}
		<Letter value={letter} on:click={() => moveLetter(isHand, index)} />
	{/each}
</div>
