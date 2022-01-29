import { Match } from '../types/Match';
import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Result } from '../types/Results';
import { Tournament } from '../types/Tournament';
import getStandings from '../utils/getStandings';

export default function tournamentEnd(tourney: Tournament): Player[] {
  if (tourney.currentRound !== tourney.options.maxRounds)
    throw Error('not in final round');

  const standings = getStandings(tourney);
  return standings;
}
