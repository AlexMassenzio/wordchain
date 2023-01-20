import {
	createLetterData,
	formWord,
	makeWordUsed,
	provideHint,
	resetBoard,
	type LetterData
} from './letterDataUtils';
import { expectEqualIgnoreOrder } from './testingUtils';

describe('createLetterData', () => {
	describe('given an array of letters', () => {
		it('creates a new array with each having a state included', () => {
			const letterArray: string[] = ['a', 'b', 'c'];

			expect(createLetterData(letterArray)).toEqual([
				{
					value: 'a',
					state: 'inPlay'
				},
				{
					value: 'b',
					state: 'inPlay'
				},
				{
					value: 'c',
					state: 'inPlay'
				}
			]);
		});
	});

	describe('given an empty array', () => {
		it('should return an empty array', () => {
			const letterArray: string[] = [];

			expect(createLetterData(letterArray)).toEqual([]);
		});
	});
});

describe('formWord', () => {
	describe('given an array of LetterData', () => {
		it('should return a string of a formed word.', () => {
			const letterDataArray: LetterData[] = [
				{ value: 'x', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'o', state: 'inPlay' },
				{ value: 'w', state: 'inPlay' }
			];

			expect(formWord(letterDataArray)).toEqual('how');
		});
	});

	describe('given an array of LetterData', () => {
		it('should return a string of a formed word.', () => {
			const letterDataArray: LetterData[] = [
				{ value: 'x', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'o', state: 'inPlay' },
				{ value: 'w', state: 'inPlay' }
			];

			expect(formWord(letterDataArray)).toEqual('how');
		});
	});
});

describe('makeWordUsed', () => {
	it('should return a the letter array with the word specified used.', () => {
		const letterDataArray: LetterData[] = [
			{ value: 'x', state: 'used' },
			{ value: 'h', state: 'firstLetter' },
			{ value: 'o', state: 'inPlay' },
			{ value: 'w', state: 'inPlay' }
		];

		const expectedLetterArray: LetterData[] = [
			{ value: 'x', state: 'used' },
			{ value: 'h', state: 'used' },
			{ value: 'o', state: 'used' },
			{ value: 'w', state: 'firstLetter' }
		];

		expect(makeWordUsed(letterDataArray, 'how')).toEqual(expectedLetterArray);
	});

	describe('when the word does not match up with the letter array', () => {
		it('should return a the letter array with the word specified used.', () => {
			const letterDataArray: LetterData[] = [
				{ value: 'x', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'o', state: 'inPlay' },
				{ value: 'w', state: 'inPlay' }
			];

			expect(() => {
				makeWordUsed(letterDataArray, 'howl');
			}).toThrow('Could not find matching word');
		});
	});
});

describe('provideHint', () => {
	it('should populate a hint into playedLetters', () => {
		let playedLetters: LetterData[] = [
			{ value: 'h', state: 'firstLetter' },
			{ value: 'e', state: 'hint' },
			{ value: 'o', state: 'inPlay' }
		];

		let unplayedLetters: LetterData[] = [
			{ value: 'l', state: 'inPlay' },
			{ value: 'l', state: 'inPlay' }
		];

		[playedLetters, unplayedLetters] = provideHint(playedLetters, unplayedLetters, 'hello');

		const expectedPlayedLetters: LetterData[] = [
			{ value: 'h', state: 'firstLetter' },
			{ value: 'e', state: 'hint' },
			{ value: 'l', state: 'hint' }
		];

		const expectedUnplayedLetters: LetterData[] = [
			{ value: 'l', state: 'inPlay' },
			{ value: 'o', state: 'inPlay' }
		];

		expect(playedLetters).toEqual(expectedPlayedLetters);
		expectEqualIgnoreOrder(unplayedLetters, expectedUnplayedLetters);
	});
	describe('given a previous word has been solved', () => {
		it('should still populate a hint into playedLetters', () => {
			let playedLetters: LetterData[] = [
				{ value: 'y', state: 'used' },
				{ value: 'a', state: 'used' },
				{ value: 'h', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'e', state: 'hint' },
				{ value: 'o', state: 'inPlay' }
			];

			let unplayedLetters: LetterData[] = [
				{ value: 'l', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' }
			];

			[playedLetters, unplayedLetters] = provideHint(playedLetters, unplayedLetters, 'hello');

			const expectedPlayedLetters: LetterData[] = [
				{ value: 'y', state: 'used' },
				{ value: 'a', state: 'used' },
				{ value: 'h', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'e', state: 'hint' },
				{ value: 'l', state: 'hint' }
			];

			const expectedUnplayedLetters: LetterData[] = [
				{ value: 'l', state: 'inPlay' },
				{ value: 'o', state: 'inPlay' }
			];

			expect(playedLetters).toEqual(expectedPlayedLetters);
			expectEqualIgnoreOrder(unplayedLetters, expectedUnplayedLetters);
		});
	});
});

describe('resetBoard', () => {
	it('should return both boards with all "inPlay" letters in the unplayedLetters board', () => {
		let playedLetters: LetterData[] = [
			{ value: 'h', state: 'firstLetter' },
			{ value: 'e', state: 'inPlay' },
			{ value: 'o', state: 'inPlay' }
		];

		let unplayedLetters: LetterData[] = [
			{ value: 'l', state: 'inPlay' },
			{ value: 'l', state: 'inPlay' }
		];

		[playedLetters, unplayedLetters] = resetBoard(playedLetters, unplayedLetters);

		const expectedPlayedLetters: LetterData[] = [{ value: 'h', state: 'firstLetter' }];

		const expectedUnplayedLetters: LetterData[] = [
			{ value: 'e', state: 'inPlay' },
			{ value: 'l', state: 'inPlay' },
			{ value: 'o', state: 'inPlay' },
			{ value: 'l', state: 'inPlay' }
		];

		expect(playedLetters).toEqual(expectedPlayedLetters);
		expectEqualIgnoreOrder(unplayedLetters, expectedUnplayedLetters);
	});
	describe('given a previous word has been solved', () => {
		it('should return both boards with all "inPlay" letters in the unplayedLetters board', () => {
			let playedLetters: LetterData[] = [
				{ value: 'y', state: 'used' },
				{ value: 'a', state: 'used' },
				{ value: 'h', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'h', state: 'firstLetter' },
				{ value: 'e', state: 'inPlay' },
				{ value: 'o', state: 'inPlay' }
			];

			let unplayedLetters: LetterData[] = [
				{ value: 'l', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' }
			];

			[playedLetters, unplayedLetters] = resetBoard(playedLetters, unplayedLetters);

			const expectedPlayedLetters: LetterData[] = [
				{ value: 'y', state: 'used' },
				{ value: 'a', state: 'used' },
				{ value: 'h', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'o', state: 'used' },
				{ value: 'h', state: 'firstLetter' }
			];

			const expectedUnplayedLetters: LetterData[] = [
				{ value: 'e', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' },
				{ value: 'o', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' }
			];

			expect(playedLetters).toEqual(expectedPlayedLetters);
			expectEqualIgnoreOrder(unplayedLetters, expectedUnplayedLetters);
		});
	});
	describe('when there are hints included', () => {
		it('should return both boards with all "inPlay" letters in the unplayedLetters board', () => {
			let playedLetters: LetterData[] = [
				{ value: 'h', state: 'firstLetter' },
				{ value: 'e', state: 'hint' },
				{ value: 'o', state: 'inPlay' }
			];

			let unplayedLetters: LetterData[] = [
				{ value: 'l', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' }
			];

			[playedLetters, unplayedLetters] = resetBoard(playedLetters, unplayedLetters);

			const expectedPlayedLetters: LetterData[] = [
				{ value: 'h', state: 'firstLetter' },
				{ value: 'e', state: 'hint' }
			];

			const expectedUnplayedLetters: LetterData[] = [
				{ value: 'l', state: 'inPlay' },
				{ value: 'o', state: 'inPlay' },
				{ value: 'l', state: 'inPlay' }
			];

			expect(playedLetters).toEqual(expectedPlayedLetters);
			expectEqualIgnoreOrder(unplayedLetters, expectedUnplayedLetters);
		});
	});
});
