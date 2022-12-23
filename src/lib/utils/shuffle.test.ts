import { vi, type Mock } from 'vitest';
import rng from './getRandomNumberGenerator';
import getShuffledWord, { rearrangeLettersManually } from './shuffle';

// TODO: Figure out how to not mock these store modules.
vi.mock('svelte/store', () => ({ get: vi.fn() }));
vi.mock('$lib/store', () => ({ gameProgress: 0 }));
vi.mock('./getRandomNumberGenerator');

describe('getShuffledWord', () => {
	const lettersStub = ['r', 'o', 'v', 'e'];

	describe('when the letter shuffling results in no changes to the letter ordering', () => {
		beforeEach(() => {
			(rng.nextInt as Mock).mockReturnValueOnce(3).mockReturnValueOnce(2).mockReturnValueOnce(1);
		});

		it('returns the word manually shuffled', () => {
			expect(getShuffledWord(lettersStub)).toEqual(rearrangeLettersManually(lettersStub));
		});
	});

	describe('when the letter shuffling results changes to the letter ordering', () => {
		beforeEach(() => {
			(rng.nextInt as Mock).mockReturnValueOnce(1).mockReturnValueOnce(2).mockReturnValueOnce(0);
		});

		it('returns the shuffled letters', () => {
			expect(getShuffledWord(lettersStub)).toEqual(['e', 'r', 'v', 'o']);
		});
	});
});
