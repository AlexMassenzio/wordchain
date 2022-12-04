import { dictionary } from '$lib/assets/dictionary';
import Prando from 'prando';

export const checkIfValidWord = (word: string) => {
	return dictionary.includes(word.toLowerCase());
};

export const generateWord = (solvedWords: number, firstLetter = '') => {
	const date = new Date();
	const rng = new Prando(date.getDay().toString() + ' ' + solvedWords);
	
	let generatedWord: string;

	if (firstLetter.length > 0) {
		const wordsWithFirstLetter = dictionary.filter((word) => word[0] == firstLetter);
		generatedWord = wordsWithFirstLetter[rng.nextInt(0, wordsWithFirstLetter.length)];
			
		if (typeof generatedWord == 'undefined') {
			generatedWord = wordsWithFirstLetter[0];
		}
		
		return generatedWord;
	} else {
		return dictionary[rng.nextInt(0, dictionary.length)];
	}
};
