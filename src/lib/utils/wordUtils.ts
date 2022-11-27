import { dictionary } from '$lib/assets/dictionary';
import Prando from 'prando';

export const checkIfValidWord = (word: string) => {
	return dictionary.includes(word.toLowerCase());
};

export const generateWord = (solvedWords: number, firstLetter = '') => {
	const date = new Date();
	const rng = new Prando(date.getDay().toString() + ' ' + solvedWords);

	if (firstLetter.length > 0) {
		const wordsWithFirstLetter = dictionary.filter((word) => word[0] == firstLetter);
		return wordsWithFirstLetter[Math.floor(rng.next(wordsWithFirstLetter.length))];
	} else {
		return dictionary[Math.floor(rng.next(dictionary.length))];
	}
};
