import shuffleArray from './shuffle';

export type LetterData = {
	value: string;
	state: string;
};

export const createLetterData = (letterArray: string[], init = false, shuffle = false) => {
	if (shuffle) letterArray = shuffleArray(letterArray);

	const letterDataArray: LetterData[] = [];

	letterArray.forEach((letter) => {
		letterDataArray.push({
			value: letter,
			state: 'inPlay'
		});
	});

	if (init) letterDataArray[0].state = 'firstLetter';

	return letterDataArray;
};

export const formWord = (letterArray: LetterData[]) => {
	let formedWord = '';

	letterArray.forEach((letter) => {
		if (letter.state != 'used') formedWord += letter.value;
	});

	return formedWord;
};

export const makeWordUsed = (letterArray: LetterData[], validWord: string) => {
	const wordStartIndex = letterArray.findIndex((letter) => letter.state == 'firstLetter');

	if (wordStartIndex == -1 || wordStartIndex + validWord.length != letterArray.length) {
		throw new Error('Could not find matching word');
	}

	for (let i = wordStartIndex; i < wordStartIndex + validWord.length - 1; i++) {
		letterArray[i].state = 'used';
	}

	letterArray[wordStartIndex + validWord.length - 1].state = 'firstLetter';

	return letterArray;
};

export const provideHint = (
	playedLetters: LetterData[],
	unplayedLetters: LetterData[],
	wordToSolve: string
) => {
	const currentWordFirstIndex = playedLetters.findIndex((letter) => letter.state == 'firstLetter');
	let hintLetterIndex = playedLetters.findIndex((letter) => letter.state == 'inPlay');

	if (currentWordFirstIndex == -1) {
		console.error('No hint letter found');
		return [playedLetters, unplayedLetters];
	}

	if (hintLetterIndex == -1) {
		hintLetterIndex = playedLetters.length;
	}

	[playedLetters, unplayedLetters] = resetBoard(playedLetters, unplayedLetters);

	const hintLetter = wordToSolve[hintLetterIndex - currentWordFirstIndex];

	const indexWithHintLetter = unplayedLetters.findIndex((letter) => letter.value == hintLetter);

	if (indexWithHintLetter == -1) {
		console.error('No hint letter found');
	} else {
		unplayedLetters[indexWithHintLetter].state = 'hint';
		playedLetters.push(unplayedLetters[indexWithHintLetter]);
		unplayedLetters.splice(indexWithHintLetter, 1);
	}

	return [playedLetters, unplayedLetters];
};

export const resetBoard = (playedLetters: LetterData[], unplayedLetters: LetterData[]) => {
	const newPlayedLetters: LetterData[] = [];

	for (let i = 0; i < playedLetters.length; i++) {
		const letter = playedLetters[i];
		if (letter.state == 'inPlay') {
			unplayedLetters.push(letter);
		} else {
			newPlayedLetters.push(letter);
		}
	}

	return [newPlayedLetters, unplayedLetters];
};
