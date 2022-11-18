<script lang="ts">
	import Board from '$lib/components/Board.svelte';
	import { formWord, makeWordUsed, type LetterData } from '$lib/utils/letterDataUtils';
	import { createLetterData } from '$lib/utils/letterDataUtils';
	import shuffle from '$lib/utils/shuffle';
	import { checkIfValidWord, generateWord } from '$lib/utils/wordUtils';

	let wordToGuess: string = generateWord();
	let playedLetters: LetterData[] = createLetterData([wordToGuess[0]], true);
	let unplayedLetters: LetterData[] = createLetterData([...wordToGuess.substring(1)]);

	// update the board when we get a new word to guess
	$: unplayedLetters = createLetterData([...wordToGuess.substring(1)], false, true);

	const moveLetter = (toPlayed: boolean, index: number) => {
		let letter: LetterData;
		if (index < 0) {
			return;
		}

		if (toPlayed && unplayedLetters.length > 0) {
			letter = unplayedLetters[index];
			playedLetters = [...playedLetters, letter];
			unplayedLetters.splice(index, 1);
			unplayedLetters = unplayedLetters;
		} else if (!toPlayed && playedLetters.length > 0) {
			if (playedLetters[index].state != 'inPlay') return; //check if move is valid
			letter = playedLetters[index];
			unplayedLetters = [...unplayedLetters, letter];
			playedLetters.splice(index, 1);
			playedLetters = playedLetters;
		}
	};

	function handleKeydown(event: any) {
		// Allow backspace if the last letter is a part of our play
		if (event.key == 'Backspace' && playedLetters[playedLetters.length - 1].state == 'inPlay') {
			moveLetter(false, playedLetters.length - 1);
		}
		// Autofill a letter for convienence
		else if (event.keyCode >= 65 && event.keyCode <= 90) {
			let unplayedLetterIndex: number = unplayedLetters.findIndex(
				(letter) => letter.value == event.key
			);
			moveLetter(true, unplayedLetterIndex);
		} else if (event.key == 'Enter') {
			processWord();
		}
	}

	const processWord = () => {
		const wordToCheck = formWord(playedLetters);

		if (checkIfValidWord(wordToCheck)) {
			playedLetters = makeWordUsed(playedLetters, wordToCheck);
			wordToGuess = generateWord(playedLetters[playedLetters.length - 1].value);
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
