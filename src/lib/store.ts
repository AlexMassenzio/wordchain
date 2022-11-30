import { readable } from 'svelte/store';
import { version } from '$app/environment';

export const appVersion = readable(version);
