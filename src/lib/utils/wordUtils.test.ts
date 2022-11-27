import { checkIfValidWord, generateWord } from './wordUtils';

// checkIfValidWord
describe('When given a set of words', () => {
	it('should correctly decide which words are in a dictonary.', () => {
		const realWord = 'Hello';
		const fakeWord = 'Hellodufhs';

		expect(checkIfValidWord(realWord)).toBe(true);
		expect(checkIfValidWord(fakeWord)).toBe(false);
	});
});

// generateWord
it('should return a newly generated word from the dictionary.', () => {
	const word: string = generateWord(1);
	expect(word.length).toBe(5);
});

describe('when firstLetter param is being used', () => {
	it('should return a newly generated word using the first letter provided.', () => {
		const word: string = generateWord(1, 'h');
		expect(word.length).toBe(5);
		expect(word[0]).toBe('h');
	});
});

it('should ensure that word generation is properly using seeding.', () => {
	const word: string = generateWord(2);
	const word2: string = generateWord(2);
	const word3: string = generateWord(3);
	expect(word).toBe(word2);
	expect(word).not.toBe(word3);
});
