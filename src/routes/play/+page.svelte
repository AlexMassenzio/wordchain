<script lang="ts">
	import { browser } from '$app/environment';
	import Board from '$lib/components/Board.svelte';
	import GameSummary from '$lib/components/GameSummary.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { gameProgress } from '$lib/store';
	import { formWord, makeWordUsed, type LetterData } from '$lib/utils/letterDataUtils';
	import { createLetterData } from '$lib/utils/letterDataUtils';
	import { checkIfValidWord, generateWord } from '$lib/utils/wordUtils';

	gameProgress.set(0);

	const wordsToSolve = 7;

	let wordToGuess: string = generateWord($gameProgress);
	let playedLetters: LetterData[] = createLetterData([wordToGuess[0]], true);
	let unplayedLetters: LetterData[];

	let gameComplete = false;
	let wasGameAlreadyPlayed = false;

	let elapsedTime = 0;
	let now = new Date();

	// update the board when we get a new word to guess
	$: unplayedLetters = createLetterData([...wordToGuess.substring(1)], false, true);

	if (browser && window.localStorage.getItem('lastPlayed') == now.toDateString()) {
		gameComplete = true;
		wasGameAlreadyPlayed = true;
	}

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

		if (checkIfValidWord(wordToCheck)) {
			playedLetters = makeWordUsed(playedLetters, wordToCheck);
			gameProgress.update((progress) => progress + 1);
			wordToGuess = generateWord($gameProgress, playedLetters[playedLetters.length - 1].value);

			gameComplete = $gameProgress == wordsToSolve;
		}
	};
</script>

<svelte:window on:keydown={handleKeydown} />

{#if !gameComplete}
	<Timer bind:elapsed={elapsedTime} />
	<Board letters={playedLetters} isHand={false} {moveLetter} />
	<p class="italic text-stone-500 text-center p-2 text-3xl">{$gameProgress}/{wordsToSolve}</p>
	<Board letters={unplayedLetters} isHand={true} {moveLetter} />

	<button
		class="block m-auto mt-4 border-2 text-xl rounded-md p-2 bg-bg-600
hover:bg-stone-600
transition-colors"
		on:click={processWord}>Check</button
	>

	<p class="italic text-stone-500 text-center p-2 text-xl">
		Hint: You can use your keyboard on desktop!
	</p>

	<!-- Debug retire button -->
	<!-- <button
		class="block m-auto mt-4 border-2 text-xl rounded-md p-2 bg-bg-600
hover:bg-stone-600
transition-colors"
		on:click={() => (gameComplete = true)}>Retire</button
	> -->
{:else}
	<GameSummary
		{wasGameAlreadyPlayed}
		solvedWords={$gameProgress}
		{wordsToSolve}
		timeCompleted={elapsedTime / 1000}
	/>
{/if}
