<script lang="ts">
	import { browser } from '$app/environment';
	import Board from '$lib/components/Board.svelte';
	import GameSummary from '$lib/components/GameSummary.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { gameProgress } from '$lib/store';
	import { formWord, makeWordUsed, provideHint, type LetterData } from '$lib/utils/letterDataUtils';
	import { createLetterData } from '$lib/utils/letterDataUtils';
	import { checkIfValidWord } from '$lib/utils/wordUtils';
	import HintButton from '../HintButton.svelte';

	let now = new Date();
	export let wordList: string[];

	gameProgress.set(0);

	const wordsToSolve = wordList.length - 1;
	let solvedWords: string[] = [];

	let wordToGuess = wordList[0];
	let playedLetters: LetterData[] = createLetterData([wordToGuess[0]], true);
	let unplayedLetters: LetterData[];

	let gameComplete = false;
	let wasGameAlreadyPlayed = false;

	let elapsedTime = 0;

	let wrongGuess = false;

	// update the board when we get a new word to guess
	$: {
		if (wordToGuess !== undefined) {
			unplayedLetters = createLetterData([...wordToGuess.substring(1)], false, true);
		}
	}

	if (browser && window.localStorage.getItem('lastPlayed') == now.toDateString()) {
		gameComplete = true;
		wasGameAlreadyPlayed = true;
	}

	const moveLetter = (toPlayed: boolean, index: number) => {
		let letter: LetterData;
		if (index < 0) return;

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

	function handleKeydown(event: { key: string; keyCode: number }) {
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

		if (checkIfValidWord(wordToCheck, wordList)) {
			playedLetters = makeWordUsed(playedLetters, wordToCheck);
			gameProgress.update((progress) => progress + 1);
			solvedWords.push(wordToCheck);
			wordToGuess = wordList[$gameProgress];

			gameComplete = $gameProgress == wordsToSolve;
		} else {
			wrongGuess = true;

			setTimeout(() => {
				wrongGuess = false;
			}, 500);
		}
	};

	const processHint = () => {
		[playedLetters, unplayedLetters] = provideHint(playedLetters, unplayedLetters, wordToGuess);
	};
</script>

<svelte:window on:keydown={handleKeydown} />

{#if !gameComplete}
	<Timer bind:elapsed={elapsedTime} />
	<Board letters={playedLetters} isHand={false} bind:wrongGuess {moveLetter} />
	<p class="p-2 text-center text-3xl italic text-stone-500">{$gameProgress}/{wordsToSolve}</p>
	<Board letters={unplayedLetters} isHand={true} {moveLetter} />

	<div class="mt-4 flex justify-center gap-4">
		<HintButton hintCallback={processHint} />
		<button
			class="bg-bg-600 block rounded-md border-2 p-2 text-xl
            transition-colors
            hover:bg-stone-600"
			on:click={processWord}>Check</button
		>
	</div>

	<p class="p-2 text-center text-xl italic text-stone-500">
		Hint: You can use your keyboard on desktop!
	</p>
{:else}
	<GameSummary
		gameType="chainSeven"
		{wasGameAlreadyPlayed}
		solvedWords={$gameProgress}
		{wordsToSolve}
		timeCompleted={elapsedTime / 1000}
	/>
{/if}
