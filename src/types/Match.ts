import { Player } from './Player';
import { Result } from './Results';

export type Match = {
  matchNumber: number;
  round: number;
  playerOne: Player;
  playerTwo: Player;
  result: Result;
  active: boolean;
  etc: unknown;
};

export type Matches = Match[];
