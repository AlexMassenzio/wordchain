import { readable, writable } from 'svelte/store';
import { version } from '$app/environment';

export const appVersion = readable(version);
export const gameProgress = writable(0);
