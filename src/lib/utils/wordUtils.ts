import { dictionary } from '$lib/assets/dictionary';

export const checkIfValidWord = (word: string) => {
	return dictionary.includes(word.toLowerCase());
};

export const generateWord = (firstLetter: string = '') => {
	if (firstLetter.length > 0) {
		const wordsWithFirstLetter = dictionary.filter((word) => word[0] == firstLetter);
		return wordsWithFirstLetter[Math.floor(Math.random() * wordsWithFirstLetter.length)];
	} else {
		return dictionary[Math.floor(Math.random() * dictionary.length)];
	}
};
