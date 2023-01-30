import { Player } from './Player';
import { Result } from './Results';

export type Match = {
  matchNumber: number;
  round: number;
  playerOne: Player;
  playerTwo: Player;
  result: Result | null;
  active: boolean;
  etc: unknown;
  isPlayoff?: boolean;

  // this variable is actually used to check if
  // in a dobule elimination, the match is in a winners bracket (winners:true)
  // or in a losers bracket (winners:false)
  winners: boolean;
};

export type Matches = Match[];
