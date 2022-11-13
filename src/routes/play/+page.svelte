<script lang="ts">
	import Letter from '$lib/components/Letter.svelte';

	let playedLetters = ['h', 'e', 'l'];
	let unplayedLetters = ['o', 'e', 'l'];

	const moveLetter = (toPlayed: boolean, index: number) => {
		let letter: any;
		if (index < 0) {
			console.log('nope');
			return;
		}

		if (toPlayed && unplayedLetters.length > 0) {
			letter = unplayedLetters[index];
			playedLetters = [...playedLetters, letter];
			unplayedLetters.splice(index, 1);
			unplayedLetters = unplayedLetters;
		} else if (!toPlayed && playedLetters.length > 0) {
			letter = playedLetters[index];
			unplayedLetters = [...unplayedLetters, letter];
			playedLetters.splice(index, 1);
			playedLetters = playedLetters;
		}
	};

	function handleKeydown(event: any) {
		if (event.key == 'Backspace') {
			moveLetter(false, playedLetters.length - 1);
		} else if (event.keyCode >= 65 && event.keyCode <= 90) {
			let unplayedLetterIndex: number = unplayedLetters.findIndex((letter) => letter == event.key);
			console.log(unplayedLetterIndex);
			moveLetter(true, unplayedLetterIndex);
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex border-2 p-2">
	{#each playedLetters as letter, index}
		<Letter value={letter} on:click={() => moveLetter(false, index)} />
	{/each}
</div>

<br />

<div class="flex border-2 p-2">
	{#each unplayedLetters as letter, index}
		<Letter value={letter} on:click={() => moveLetter(true, index)} />
	{/each}
</div>
