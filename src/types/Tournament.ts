import { Player } from './Player';
import { Match } from './Match';
import { Options } from './Options';

export type Tournament = {
  lastMatchNumber: number;
  players: Player[];
  matches: Match[];
  options: Options;
  /**
   * @Param  remoteStandings
   *
   *  Remote standings is optional, it will be used to make a tournament that
   *  will not run in this lib, but can receive the parameters of winners here
   *  for compatibility.
   **/
  remoteStandings?: Player[];
  ended: boolean;
  currentRound: number;
  etc: any;
  inPlayoffs?: boolean;
};
