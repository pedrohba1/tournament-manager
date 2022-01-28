import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function nextRound(tourney: Tournament): Tournament {
  // throws error if a match has no result
  if (tourney.matches.find((m) => m.result === null))
    throw Error('cant start next round if match has no result');

  // pairs players accordingly

  return tourney;
}
