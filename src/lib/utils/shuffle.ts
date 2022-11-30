import Prando from 'prando';
import { get } from 'svelte/store';
import { gameProgress } from '$lib/store';

export default (array: string[]) => {
	const today = new Date();
	const rng = new Prando(today.toDateString() + get(gameProgress));
	for (let i = array.length - 1; i > 0; i--) {
		const j = rng.nextInt(0, i + 1);
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
};
