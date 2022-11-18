export type LetterData = {
	value: string;
	state: string;
};

export const createLetterData = (letterArray: string[], init = false) => {
	let letterDataArray: LetterData[] = [];
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
	let formedWord: string = '';

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
