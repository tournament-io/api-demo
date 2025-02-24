import type { Match } from "./tio-dtos";

// helper functions

import type { SimplePlayer } from "./tio-dtos";

export function getEntryName(entry: null | SimplePlayer | (SimplePlayer | null)[]): string {
	if (Array.isArray(entry)) {
		return entry.map(e => e?.name ?? '').join(' / ');
	}
	return entry?.name ?? '';
}

export function getDisplayScore(match: Match): string {
	if (match.displayScore) {
		return match.displayScore.join(' : ');
	}
	return 'vs';
}