import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import setMaxRound from './setMaxRound';

export default function createTourney(
  options: Options,
  players: Player[]
): Tournament {
  let tourney = <Tournament>{};
  tourney.options = options;
  tourney.lastMatchNumber = 1;
  tourney.currentRound = 1;
  tourney.etc = {};
  tourney.players = players.map((p, index) => ({
    ...p,
    blossomId: index,
    active: true,
    tiebreakers: {
      byes: 0,
      gamePoints: 0,
      matchPoints: 0,
      matchesSummary: { d: 0, l: 0, w: 0 },
      gamesSummary: { d: 0, l: 0, w: 0 },
      omwp: 0,
      gwp: 0,
      ogwp: 0,
      mwp: 0,
    },
  }));

  if (!options.maxRounds) {
    tourney = setMaxRound(tourney);
  } else tourney.options.maxRounds = options.maxRounds;
  return tourney;
}
