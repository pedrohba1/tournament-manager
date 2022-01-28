import { Player } from './Player';
import { Match } from './Match';
import { Options } from './Options';

export type Tournament = {
  lastMatchNumber: number;
  players: Player[];
  matches: Match[];
  options: Options;
  currentRound: number;
  maxRounds: number;
};
