<script lang="ts">
	import { browser } from '$app/environment';
	import Board from '$lib/components/Board.svelte';
	import GameSummary from '$lib/components/GameSummary.svelte';
	import Timer from '$lib/components/Timer.svelte';
	import { gameProgress } from '$lib/store';
	import { checkIfValidWord, generateWord } from '$lib/utils/wordUtils';
	import HintButton from '../HintButton.svelte';
	import {
		createLetterData,
		formWord,
		makeWordUsed,
		provideHint,
		type LetterData
	} from '$lib/utils/letterDataUtils';

	gameProgress.set(0);

	let solvedWords: string[] = [];

	let wordToGuess: string = generateWord(solvedWords);
	let playedLetters: LetterData[] = createLetterData([wordToGuess[0]], true);
	let unplayedLetters: LetterData[];

	let gameComplete = false;
	let wasGameAlreadyPlayed = false;

	let timer = 60;
	let now = new Date();

	let wrongGuess = false;

	// update the board when we get a new word to guess
	$: unplayedLetters = createLetterData([...wordToGuess.substring(1)], false, true);

	$: if (timer <= 0) {
		gameComplete = true;
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
	let k: string;
	function handleKeydown(event: KeyboardEvent) {
		k = event.key;
		// Allow backspace if the last letter is a part of our play
		if (event.key == 'Backspace' && playedLetters[playedLetters.length - 1].state == 'inPlay') {
			moveLetter(false, playedLetters.length - 1);
		} else if (event.key == 'Enter') {
			processWord();
		}
		// Autofill a letter for convienence
		else {
			let unplayedLetterIndex: number = unplayedLetters.findIndex(
				(letter) => letter.value == event.key
			);
			moveLetter(true, unplayedLetterIndex);
		}
	}

	const processWord = () => {
		const wordToCheck = formWord(playedLetters);

		if (checkIfValidWord(wordToCheck)) {
			playedLetters = makeWordUsed(playedLetters, wordToCheck);
			gameProgress.update((progress) => progress + 1);
			solvedWords.push(wordToCheck);
			wordToGuess = generateWord(solvedWords);
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

<!-- <svelte:window on:keydown={handleKeydown} /> -->
<textarea id="mobileKeyboardInput" inputmode="text" autocorrect="off" on:keyup={handleKeydown} />
<p>{k}</p>
<!-- {#if !gameComplete} -->
<Timer bind:elapsed={timer} isCountingDown={true} />
<Board letters={playedLetters} isHand={false} bind:wrongGuess {moveLetter} />
<p class="p-2 text-center text-3xl italic text-stone-500">#{$gameProgress}</p>
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
<button
	class="bg-bg-600 block rounded-md border-2 p-2 text-xl
		transition-colors
		hover:bg-stone-600"
	on:click={() => document.getElementById('mobileKeyboardInput')?.focus()}
	>keyboard
</button>
<!-- {:else}
	<GameSummary
		gameType="oneMinute"
		{wasGameAlreadyPlayed}
		wordsToSolve={-1}
		solvedWords={$gameProgress}
		timeCompleted={timer / 1000}
	/>
{/if} -->
