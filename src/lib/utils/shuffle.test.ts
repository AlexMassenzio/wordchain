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

describe('rearrangeLettersManually', () => {
  describe('given an empty array', () => {
    it('returns an empty array', () => {
      expect(rearrangeLettersManually([])).toEqual([]);
    });
  });

  describe('given an array with one letter', () => {
    it('returns the same array', () => {
      expect(rearrangeLettersManually(['r'])).toEqual(['r']);
    });
  });

  describe('given an array with two letters', () => {
    it('returns the array backwards', () => {
      expect(rearrangeLettersManually(['r', 'o'])).toEqual(['o', 'r']);
    });
  });

  describe('given an odd amount of letters', () => {
    it('shuffles the letters', () => {
      expect(rearrangeLettersManually(['g', 'r', 'o', 'v', 'e'])).toEqual(['o', 'g', 'v', 'r', 'e']);
    });
  });

  describe('given an even amount of letters', () => {
    it('shuffles the letters', () => {
      expect(rearrangeLettersManually(['r', 'o', 'v', 'e'])).toEqual(['v', 'r', 'e', 'o']);
    });
  });
});
