import type { Match, MatchResultDto, SimplePlayer } from "./tio-dtos";
import type { Court } from "./tio-dtos";
import type { TournamentDto } from "./tio-dtos";
import type { TournamentListItemDto } from "./tio-dtos";

export class TioApi {
	private baseUrl: string;

	constructor(private token: string, options: { baseUrl?: string } = {}) {
		this.baseUrl = options.baseUrl || 'https://tioapi.zrok.poppen.cloud/v1/public';
	}

	private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
		const token = this.token;
		if (!token) throw new Error('No API token');

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
				...options,
				headers: {
					...options.headers,
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`API error: ${response.statusText}`);
		}

		return response.json();
	}

	public async getTournaments(): Promise<TournamentListItemDto[]> {
		return this.fetchWithAuth('/tournaments');
	}

	public async getTournament(id: string): Promise<TournamentDto> {
		return this.fetchWithAuth(`/tournaments/${id}`);
	}

  public async getCourts(tournamentId: string): Promise<Court[]> {
		return this.fetchWithAuth(`/tournaments/${tournamentId}/courts?includeMatchDetails=true`);
	}

  public async getCourt(tournamentId: string, courtId: string): Promise<Court> {
    return this.fetchWithAuth(`/tournaments/${tournamentId}/courts/${courtId}?includeMatchDetails=true`);
  }

	public async getMatch(tournamentId: string, matchId: string): Promise<Match> {
		return this.fetchWithAuth(`/tournaments/${tournamentId}/matches/${matchId}`);
	}

	public async setLiveMatchResult(
		tournamentId: string,
		matchId: string,
		result: MatchResultDto
	): Promise<Match> {
		return this.fetchWithAuth(`/tournaments/${tournamentId}/matches/${matchId}/live-result`, {
			method: 'PUT',
			body: JSON.stringify(result),
		});
	}

  public async setMatchResult(
    tournamentId: string,
    matchId: string,
    result: MatchResultDto
  ): Promise<Match> {
    return this.fetchWithAuth(`/tournaments/${tournamentId}/matches/${matchId}/result`, {
      method: 'PUT',
      body: JSON.stringify(result),
    });
  }
}


