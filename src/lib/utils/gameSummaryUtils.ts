export type GameData = {
	timeCompleted: number;
	wordsToSolve: number;
	solvedWords: number;
};

export const getGameSummary = (
	gameType: 'chainSeven' | 'oneMinute',
	gameData: GameData
): string => {
	const gameBeginning = new Date('11/27/2022');
	const now = new Date();

	const gameNumber = Math.floor((now.getTime() - gameBeginning.getTime()) / (1000 * 3600 * 24)) + 1;
	const formattedDate = +(now.getMonth() + 1) + '/' + now.getDate();
	let gameSummary = 'Wordchain #' + gameNumber + ' (' + formattedDate + ')\n';

	let completionEmoji: string;

	switch (gameType) {
		case 'chainSeven':
			completionEmoji = gameData.solvedWords == gameData.wordsToSolve ? '✅ ' : '❌ ';

			gameSummary +=
				completionEmoji +
				+gameData.solvedWords +
				'/' +
				gameData.wordsToSolve +
				'\n🏁 ' +
				gameData.timeCompleted.toFixed(2) +
				's';
			break;
		case 'oneMinute':
			gameSummary += '⏱ 1m\n🔗 ' + +gameData.solvedWords + ' solved';
			break;
		default:
			gameSummary +=
				'if you got this, please submit a bug ticket:\n' +
				'https://github.com/AlexMassenzio/wordchain/issues/new/choose';
			break;
	}

	return gameSummary + '\nhttps://wordcha.in/';
};
