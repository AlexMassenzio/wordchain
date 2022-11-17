import { checkIfValidWord } from './wordCheckUtils';

describe('When given a set of words', () => {
	it('should correctly decide which words are in a dictonary.', () => {
		const realWord = 'Hello';
		const fakeWord = 'Hellodufhs';

		expect(checkIfValidWord(realWord)).toEqual(true);
		expect(checkIfValidWord(fakeWord)).toEqual(false);
	});
});
