import { Player } from './Player';
import { Result } from './Results';

export type Match = {
  matchNumber: number;
  round: number;
  playerOne: Player | 'bye';
  playerTwo: Player | 'bye';
  active: boolean;
  result: Result;
  playerOneWins: number;
  playerTwoWins: number;
  draws: number;
  etc: unknown;
};

export type Matches = Match[];
