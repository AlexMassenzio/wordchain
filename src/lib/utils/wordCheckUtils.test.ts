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
	const word: string = generateWord();
	expect(word.length).toBe(5);
});

describe('when firstLetter param is being used', () => {
	it('should return a newly generated word using the first letter provided.', () => {
		const word: string = generateWord('h');
		expect(word.length).toBe(5);
		expect(word[0]).toBe('h');
	});
});
