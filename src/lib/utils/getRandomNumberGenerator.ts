import Prando from 'prando';
import { get } from 'svelte/store';
import { gameProgress } from '$lib/store';

export default new Prando(new Date().toDateString() + get(gameProgress));
