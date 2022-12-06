import areArraysEqual from './areArraysEqual';
import rng from './getRandomNumberGenerator';

export const getShuffledWord = (letters: string[]): string[] => {
	const rearrangedWord = rearrangeLettersWithRng(letters);

	const isShuffledWordUnchanged = areArraysEqual(letters, rearrangedWord);
	if (isShuffledWordUnchanged) return rearrangeLettersManually(letters);

	return rearrangedWord;
};

const rearrangeLettersWithRng = (letters: string[]) => {
	const newLetters = [...letters];

	for (let i = newLetters.length - 1; i > 0; i--) {
		const j = rng.nextInt(0, i);

		[newLetters[i], newLetters[j]] = [newLetters[j], newLetters[i]];
	}

	return newLetters;
};

export const rearrangeLettersManually = (letters: string[]) => [
	letters[2],
	letters[0],
	letters[3],
	letters[1]
];

export default getShuffledWord;
