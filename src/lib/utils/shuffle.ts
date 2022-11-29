import Prando from 'prando';

export default (array: string[]) => {
	const today = new Date();
	const rng = new Prando(today.toDateString() + array[0]);
	for (let i = array.length - 1; i > 0; i--) {
		const j = rng.nextInt(0, i + 1);
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};
