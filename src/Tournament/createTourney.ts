import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function createTourney(
  options: Options,
  players: Player[]
): Tournament {
  const tourney = <Tournament>{};
  tourney.options = options;
  tourney.lastMatchNumber = 1;
  tourney.players = players.map((p) => ({
    ...p,
    tiebreakers: {
      gwp: 0,
      matchPoints: 0,
      ogwp: 0,
      summary: { d: 0, l: 0, w: 0 },
      omwp: 0.33,
      mwp: 0.33,
      ogw: 0.33,
      omw: 0,
      pgw: 0,
    },
  }));

  return tourney;
}
