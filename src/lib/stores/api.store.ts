import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import { TioApi } from '$lib/api/tio-api';

const storedToken = browser ? localStorage.getItem('apiToken') : null;
export const apiToken = writable<string | null>(storedToken);
export const api = derived([apiToken], ([token]) => new TioApi(token ?? ''));

if (browser) {
	apiToken.subscribe((value) => {
		if (value) {
			localStorage.setItem('apiToken', value);
		} else {
			localStorage.removeItem('apiToken');
		}
	});
} 
