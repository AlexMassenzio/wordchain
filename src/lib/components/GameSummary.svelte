<script lang="ts">
	import { browser } from '$app/environment';
	import { getGameSummary } from '$lib/utils/gameSummaryUtils';

	export let wasGameAlreadyPlayed = true;

	export let gameType: 'chainSeven' | 'oneMinute';

	export let timeCompleted: number;
	export let wordsToSolve: number;
	export let solvedWords: number;

	let now = new Date();
	let copied = false;

	if (browser) {
		window.localStorage.setItem('lastPlayed', now.toDateString());

		if (!wasGameAlreadyPlayed) {
			const gameSummary = getGameSummary(gameType, {
				timeCompleted: timeCompleted,
				wordsToSolve: wordsToSolve,
				solvedWords: solvedWords
			});
			window.localStorage.setItem('dailySummary', gameSummary);
		}
	}

	const copyToClipboard = () => {
		let gameSummary = window.localStorage.getItem('dailySummary');

		if (gameSummary == null) {
			gameSummary = getGameSummary(gameType, {
				timeCompleted: timeCompleted,
				wordsToSolve: wordsToSolve,
				solvedWords: solvedWords
			});
		}

		navigator.clipboard.writeText(gameSummary);
		copied = true;
	};

	const resetCopyButton = () => {
		copied = false;
	};
</script>

<div class="text-center">
	<h1 class="pt-24 text-6xl">
		{#if wasGameAlreadyPlayed}
			You already completed today's challenge!
		{:else if gameType == 'chainSeven'}
			Total time completed: {timeCompleted.toFixed(2)}s
		{:else if gameType == 'oneMinute'}
			Total words solved: {solvedWords}
		{/if}
	</h1>

	<h2 class="my-12 text-8xl">🎉</h2>

	<button
		class=" rounded-md border-2 border-stone-200 p-2 text-xl text-stone-800
			{copied ? 'bg-green-600 ' : 'bg-tile '}
			transition-colors"
		on:click={copyToClipboard}
		on:mouseleave={resetCopyButton}>{copied ? 'Copied!' : 'Share Results'}</button
	>

	<a
		class=" rounded-md border-2 border-stone-200 bg-stone-800 p-2 text-xl text-text
		transition-colors"
		href="/">Home</a
	>
</div>
