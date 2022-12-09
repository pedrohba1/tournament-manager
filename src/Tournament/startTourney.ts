import { Tournament } from '../types/Tournament';
import pairOpponentsFirstRound from '../utils/pairOpponentsFirstRound';
import createBlankMatches from '../utils/remote/createBlankMatches';
import createBracket from '../utils/single-elimination/createBracket';
import tournamentEnd from './tournamentEnd';

export default function startTourney(tourney: Tournament): Tournament {
  // execute function pairOpponents to pair opponents
  if (tourney.matches) throw Error('tourney already started');

  switch (tourney.options.format) {
    case 'swiss':
      tourney = pairOpponentsFirstRound(tourney, tourney.options.seed);
      break;
    case 'single-elim':
      tourney = createBracket(tourney, tourney.options.seed);
      break;
    case 'double-elim':
      tourney = createBracket(tourney, tourney.options.seed);
      break;
    case 'remote':
      tourney = createBlankMatches(tourney, tourney.options.seed);
  }

  return tourney;
}
