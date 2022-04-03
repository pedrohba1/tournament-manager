import { Tournament } from '../types/Tournament';
import pairOpponentsFirstRound from '../utils/pairOpponentsFirstRound';

export default function startTourney(tourney: Tournament): Tournament {
  // execute function pairOpponents to pair opponents
  if (tourney.matches) throw Error('tourney already started');
  tourney = pairOpponentsFirstRound(tourney, tourney.options.seed);

  return tourney;
}
