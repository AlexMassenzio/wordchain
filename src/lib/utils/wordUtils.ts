import Prando from 'prando';
import { dictionary } from '$lib/assets/dictionary';

export const checkIfValidWord = (word: string, wordList?: string[]) => {
	if (wordList) return wordList.includes(word.toLowerCase());
	return dictionary.includes(word.toLowerCase());
};

export const generateWord = (solvedWords: string[] = []): string => {
	const date = new Date();
	const seed =
		date.getFullYear() +
		date.getMonth() * 10000 +
		date.getDate() * 1000000 +
		(solvedWords.length + 1) * 100000000;
	const rng = new Prando(seed);

	// If the word to generate needs to have a specific first letter.
	if (solvedWords.length > 0) {
		const firstLetter = solvedWords[solvedWords.length - 1].at(-1);
		const wordsWithFirstLetter = dictionary.filter((word) => word[0] == firstLetter);
		const unusedWords = wordsWithFirstLetter.filter((word) => !solvedWords.includes(word));

		if (unusedWords.length > 0) {
			const randomIndex = rng.nextInt(0, unusedWords.length - 1);
			return unusedWords[randomIndex];
		}

		// All words with the same first letter have been solved, just pick a random word that starts with firstLetter.
		const randomIndex = rng.nextInt(0, wordsWithFirstLetter.length - 1);
		return wordsWithFirstLetter[randomIndex];
	} else {
		return dictionary[rng.nextInt(0, dictionary.length)];
	}
};
