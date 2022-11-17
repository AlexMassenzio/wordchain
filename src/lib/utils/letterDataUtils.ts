export type LetterData = {
	value: string;
	state: string;
};

export const createLetterData = (letterArray: string[]) => {
	let letterDataArray: LetterData[] = [];
	letterArray.forEach((letter) => {
		letterDataArray.push({
			value: letter,
			state: 'inPlay'
		});
	});

	return letterDataArray;
};

export const formWord = (letterArray: LetterData[]) => {
	let formedWord: string = '';

	letterArray.forEach((letter) => {
		if (letter.state != 'used') formedWord += letter.value;
	});

	return formedWord;
};

export const makeWordUsed = (letterArray: LetterData[], validWord: string) => {};
