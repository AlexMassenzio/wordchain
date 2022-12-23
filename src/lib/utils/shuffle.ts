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

	const rearrangedLetters: string[] = [];
	letters.forEach(_ => {
    const firstHalfLetter = firstHalf.shift();
    const secondHalfLetter = secondHalf.shift();
    if (rearrangedLetters.length % 2 === 0) {
      if (secondHalfLetter) rearrangedLetters.push(secondHalfLetter);
      if (firstHalfLetter) rearrangedLetters.push(firstHalfLetter);
    } else {
      if (firstHalfLetter) rearrangedLetters.push(firstHalfLetter);
      if (secondHalfLetter) rearrangedLetters.push(secondHalfLetter);
    }
  })

	return rearrangedLetters;
};

export default getShuffledWord;
