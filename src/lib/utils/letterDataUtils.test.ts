import { createLetterData, formWord, makeWordUsed, type LetterData } from './letterDataUtils';
import { vi } from 'vitest';

vi.mock('svelte/store', () => {
	return {
		get: vi.fn()
	};
});

vi.mock('$lib/store', () => {
	return {
		gameProgress: 0
	};
});

//createLetterData()
describe('when given an array of letters', () => {
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

describe('when given no letters in the array', () => {
	it('should return an empty array', () => {
		const letterArray: string[] = [];

		expect(createLetterData(letterArray)).toEqual([]);
	});
});

//formWord()
describe('when given an array of LetterData', () => {
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

//formWord()
describe('when given an array of LetterData', () => {
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

//makeWordClosed()
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
