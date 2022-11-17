<script lang="ts">
	import Board from '$lib/components/Board.svelte';
	import { formWord, type LetterData } from '$lib/utils/letterDataUtils';
	import { createLetterData } from '$lib/utils/letterDataUtils';
	import { checkIfValidWord } from '$lib/utils/wordCheckUtils';

	let playedLetters: LetterData[] = createLetterData(['h', 'e', 'l']);
	let unplayedLetters: LetterData[] = createLetterData(['o', 'e', 'l']);

	const moveLetter = (toPlayed: boolean, index: number) => {
		let letter: LetterData;
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
			let unplayedLetterIndex: number = unplayedLetters.findIndex(
				(letter) => letter.value == event.key
			);
			console.log(unplayedLetterIndex);
			moveLetter(true, unplayedLetterIndex);
		}
	}

	const processWord = () => {
		const wordToCheck = formWord(playedLetters);

		if (checkIfValidWord(wordToCheck)) {
			//TODO
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<Board letters={playedLetters} isHand={false} {moveLetter} />

<button
	class="border-2 text-xl rounded-md p-2 bg-bg-600
hover:bg-bg-700
transition-colors"
	on:click={processWord}>Check</button
>

<Board letters={unplayedLetters} isHand={true} {moveLetter} />
