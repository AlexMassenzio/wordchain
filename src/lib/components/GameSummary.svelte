<script lang="ts">
	export let timeCompleted: number;
	export let wordsToSolve: number;
	export let solvedWords: number;

	let copied = false;

	const copyToClipboard = () => {
		let gameBeginning = new Date('11/27/2022');
		let now = new Date();

		let gameNumber = Math.floor((now.getTime() - gameBeginning.getTime()) / (1000 * 3600 * 24)) + 1;
		let formattedDate = ' (' + +(now.getMonth() + 1) + '/' + now.getDate() + ')';
		let completionEmoji = solvedWords == wordsToSolve ? '✅ ' : '❌ ';
		// Copy the text inside the text field
		navigator.clipboard.writeText(
			'Wordchain #' +
				gameNumber +
				formattedDate +
				'\n' +
				completionEmoji +
				+solvedWords +
				'/' +
				wordsToSolve +
				'\n🏁 ' +
				timeCompleted.toFixed(2) +
				's\n' +
				'https://wordcha.in/'
		);
		copied = true;
	};

	const resetCopyButton = () => {
		copied = false;
	};
</script>

<div class="text-center">
	<h1 class="pt-10 text-6xl">Total time completed: {timeCompleted.toFixed(2)}s</h1>

	<h2 class="pt-16 text-8xl">🎉</h2>

	<button
		class=" border-2 rounded-md p-2 mt-8 text-stone-800 border-stone-200 text-xl
		{copied ? 'bg-green-600 ' : 'bg-tile '}
		transition-colors"
		on:click={copyToClipboard}
		on:mouseleave={resetCopyButton}>{copied ? 'Copied!' : 'Share Results'}</button
	>
	<a
		class=" border-2 rounded-md p-2 mt-8 text-text border-stone-200 text-xl bg-stone-800
		transition-colors"
		href="/">Home</a
	>
</div>
