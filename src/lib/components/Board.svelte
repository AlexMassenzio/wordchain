<script lang="ts">
	import Letter from './Letter.svelte';

	export let letters: string[];

	export let moveLetter = () => {
		return;
	};
</script>

<div class="flex border-2 p-2">
	{#each letters as letter, index}
		<Letter value={letter} on:click={() => moveLetter(true, index)} />
	{/each}
</div>
