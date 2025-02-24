import type { TournamentListItemDto } from '$lib/api/tio-api';
import { get, writable } from 'svelte/store';
import { api } from './api.store';

export const tournaments = writable<TournamentListItemDto[]>([]);

export const fetchTournaments = async () => {
  try {
    const tioApi = get(api);
    const data = await tioApi.getTournaments();
    tournaments.set(data);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    tournaments.set([]);
  }
}; 