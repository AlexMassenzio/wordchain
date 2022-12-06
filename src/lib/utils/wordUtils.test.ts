import { checkIfValidWord, generateWord } from './wordUtils';

describe('checkIfValidWord', () => {
	describe('given a real word', () => {
		it('returns true', () => {
			expect(checkIfValidWord('Hello')).toBe(true);
		});
	});

	describe('given a fake word', () => {
		it('returns true', () => {
			expect(checkIfValidWord('WelcomeToTheGrove')).toBe(false);
		});
	});
});

describe('generateWord', () => {
	it('returns a word having 5 letters', () => {
		const word = generateWord(1);

		expect(word.length).toBe(5);
	});

	describe('given a specific first letter', () => {
		it('returns a word having 5 letters', () => {
			const word = generateWord(1, 'h');

			expect(word.length).toBe(5);
		});

		it('returns a word with the same first letter as requested', () => {
			const word = generateWord(1, 'h');

			expect(word[0]).toBe('h');
		});
	});

	describe('when invoked with the same seed', () => {
		it('generates the same word each time', () => {
			const word = generateWord(42);
			const word2 = generateWord(42);

			expect(word).toBe(word2);
		});
	});

	describe('when invoked with different seeds', () => {
		it('generates the same word each time', () => {
			const word = generateWord(17);
			const word2 = generateWord(38);

			expect(word).not.toBe(word2);
		});
	});

	// Issue #17
	describe('when invoked with x as the first letter', () => {
		it('generates a word that starts with x', () => {
			const word = generateWord(1, 'x');

			expect(word[0]).toBe('x');
		});
	});
});
