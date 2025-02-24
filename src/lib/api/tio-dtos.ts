export type TournamentState =
  | 'planned' // tournament options are still being edited
  | 'pre-registration' // tournament is in pre-registration phase
  | 'check-in' // tournament is in checkin phase
  | 'ready' // tournament is ready to start
  | 'running' // tournament is running
  | 'finished' // tournament has ended
  | 'cancelled'; // tournament has been cancelled

export type TournamentStateDetail =
  | 'canceledByOrganizer'
  | 'endedByAdmin'
  | 'endedByTime'
  | 'endedByElimination'
  | 'endedByAllLeft'
  | 'willEndAfterRound'
  | 'willStartEliminationAfterRound'
  | 'willStartIfPossible';

export type TournamentMode =
  | 'double_elimination'
  | 'elimination'
  | 'last_one_standing'
  | 'lord_have_mercy'
  | 'monster_dyp'
  | 'round_robin'
  | 'rounds'
  | 'snake_draw'
  | 'swiss'
  | 'dutch_system'
  | 'whist';


export type EntryType = 'single' | 'team_name' | 'dyp' | 'byp' | 'monster_dyp';


export interface DisciplineSummary {
    _id: string;
    shortName: string;
    name: string;
    modes: TournamentMode[];
    entryType: EntryType;
  }


export interface TournamentListItemDto {
  id: string;
  name: string;
  date: Date | string;
  disciplines?: DisciplineSummary[];
  state: TournamentState;
  numPlayers: number;
  numTeams: number;
}


export interface TournamentDto {
	id: string;
  name: string;
  description?: string;
  disciplines: DisciplineDto[];

  startTime?: string;
  endTime?: string;

  state: TournamentState;
  stateDetail?: TournamentStateDetail;
}

export interface DisciplineDto {
  id: string;
  name: string;
  shortName: string;
  entryType: string;

  stages: StageDto[];
}

export interface StageDto {
  id: string;
  state: string;

  groups: GroupDto[];
}

export interface GroupDto {
  id: string;
  name: string;
  tournamentMode: string;
  state: string;
  options: GroupOptionsDto;
}

export interface GroupOptionsDto {
  numRoundsPlanned?: number;
  eliminationThirdPlace: boolean;
  matchConfigurations: {
    name: string;
    numPoints: number;
    quickEntry: boolean;
    numSets: number;
    twoAhead: boolean;
    draw: boolean;
  }[];
}


export type Set = (number | undefined)[];
export type Encounter = Set[];

export interface SimplePlayer {
  id: string;
  name: string;
}

export interface Match {
	id: string;
  entries: (null | SimplePlayer | (SimplePlayer | null)[])[];
  state: string;

  encounters: Encounter[];
  displayScore?: number[];
  isLiveResult: boolean;

  startTime?: string;
  endTime?: string;

  disciplineId: string;
  disciplineName: string;
  roundId: string;
  roundName: string;
  groupId: string;
  groupName: string;

}

export interface Court {
	id: string;
  number: number;
  name: string;
  currentMatchId?: string;
  currentMatch?: Match;
}

export interface MatchResultDto {
  result: number[][][];
}