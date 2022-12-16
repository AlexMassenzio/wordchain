import { getGameSummary } from './gameSummaryUtils';

describe('getGameSummary', () => {
	it('should return a summary of the chain-seven game', () => {
		const gameData1 = {
			timeCompleted: 25.5,
			wordsToSolve: 7,
			solvedWords: 7
		};
		const gameData2 = {
			timeCompleted: 200.211,
			wordsToSolve: 7,
			solvedWords: 7
		};

		const gameSummary1 = getGameSummary('chainSeven', gameData1);
		const gameSummary2 = getGameSummary('chainSeven', gameData2);

		expect(gameSummary1).toContain('✅ 7/7\n🏁 25.50s\nhttps://wordcha.in/');
		expect(gameSummary2).toContain('✅ 7/7\n🏁 200.21s\nhttps://wordcha.in/');
	});

	it('should return a summary of the one-minute game', () => {
		const gameData1 = {
			timeCompleted: 0,
			wordsToSolve: -1,
			solvedWords: 3
		};
		const gameData2 = {
			timeCompleted: 0,
			wordsToSolve: -1,
			solvedWords: 10
		};

		const gameSummary1 = getGameSummary('oneMinute', gameData1);
		const gameSummary2 = getGameSummary('oneMinute', gameData2);

		expect(gameSummary1).toContain('⏱ 1m\n🔗 3 solved\nhttps://wordcha.in/');
		expect(gameSummary2).toContain('⏱ 1m\n🔗 10 solved\nhttps://wordcha.in/');
	});
});
