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
  tourney.currentRound = 1;
  tourney.players = players.map((p) => ({
    ...p,
    tiebreakers: {
      gamePoints: 0,
      matchPoints: 0,
      matchesSummary: { d: 0, l: 0, w: 0 },
      gamesSummary: { d: 0, l: 0, w: 0 },
      gwp: 0,
      ogwp: 0,
      omwp: 0.33,
      mwp: 0.33,
      ogw: 0.33,
      omw: 0,
      pgw: 0,
    },
  }));

  return tourney;
}
