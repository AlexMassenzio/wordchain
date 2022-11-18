import { dictionary } from '$lib/assets/dictionary';

export const checkIfValidWord = (word: string) => {
	return dictionary[word.toLowerCase()] == 1;
};
