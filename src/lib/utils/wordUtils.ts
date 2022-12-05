import { dictionary } from '$lib/assets/dictionary';
import Prando from 'prando';

export const checkIfValidWord = (word: string) => {
	return dictionary.includes(word.toLowerCase());
};

export const generateWord = (solvedWords: number, firstLetter = ''): string => {
	const date = new Date();
	const rng = new Prando(date.getDay().toString() + ' ' + solvedWords);

	// If the generated word needs to have a specific first letter.
	if (firstLetter.length > 0) {
		const wordsWithFirstLetter = dictionary.filter((word) => word[0] == firstLetter);
		const randomIndex = rng.nextInt(0, wordsWithFirstLetter.length - 1);
		return wordsWithFirstLetter[randomIndex];
	} else {
		return dictionary[rng.nextInt(0, dictionary.length)];
	}
};
