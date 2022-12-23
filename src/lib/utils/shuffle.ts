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

export const rearrangeLettersManually = (letters: string[]) => {
	// split the array into two parts
	const firstHalf = letters.slice(0, letters.length / 2);
	const secondHalf = letters.slice(letters.length / 2);

	// alternate the letters from the two parts
	const rearrangedLetters = [];
	for (let i = 0; i < letters.length; i++) {
		if (i % 2 === 0) rearrangedLetters.push(firstHalf[i / 2]);
		else rearrangedLetters.push(secondHalf[(i - 1) / 2]);
	}

	return rearrangedLetters;
};

export default getShuffledWord;
