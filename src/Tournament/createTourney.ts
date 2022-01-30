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
    active: true,
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
    },
  }));

  const playersAmount = tourney.players.length;
  let maxRounds = 0;
  if (!tourney.options.maxRounds) {
    if (playersAmount === 2) maxRounds = 1;
    if (playersAmount >= 3 && playersAmount <= 4) maxRounds = 2;
    if (playersAmount >= 5 && playersAmount <= 8) maxRounds = 3;
    if (playersAmount >= 9 && playersAmount <= 16) maxRounds = 4;
    if (playersAmount >= 17 && playersAmount <= 32) maxRounds = 5;
    if (playersAmount >= 33 && playersAmount <= 64) maxRounds = 6;
    if (playersAmount >= 65 && playersAmount <= 128) maxRounds = 7;
    if (playersAmount >= 129 && playersAmount <= 212) maxRounds = 8;
    if (playersAmount >= 213 && playersAmount <= 384) maxRounds = 9;
    if (playersAmount >= 385 && playersAmount <= 627) maxRounds = 10;
    tourney.options.maxRounds = maxRounds;
  }

  return tourney;
}
