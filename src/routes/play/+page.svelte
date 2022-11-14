<script lang="ts">
	import Board from '$lib/components/Board.svelte';

	let playedLetters: string[] = ['h', 'e', 'l'];
	let unplayedLetters: string[] = ['o', 'e', 'l'];

	const moveLetter = (toPlayed: boolean, index: number) => {
		let letter: string;
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

	function handleKeydown(event: { key: string; keyCode: number }) {
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

<Board letters={playedLetters} {moveLetter} />

<button
	class="border-2 text-xl rounded-md p-2 bg-bg-600
hover:bg-bg-700
transition-colors">Check</button
>

<Board letters={unplayedLetters} {moveLetter} />
