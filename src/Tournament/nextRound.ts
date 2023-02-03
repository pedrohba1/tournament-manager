import { Tournament } from '../types/Tournament';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import pairOpponents from '../utils/pairOpponents';
import singleEliminationNextRound from '../utils/single-elimination/singleEliminationNextRound';
import doubleEliminationNextRound from '../utils/double-elimination/doubleEliminationNextRound';
import createPlayoffsBracket from '../utils/swiss/createPlayoffsBracket';
import hasSwissEnded from '../utils/swiss/hasSwissEnded';
import { calculateDoubleElimMaxRounds } from '../utils/calculateDoubleElimMaxRounds';

export default function nextRound(tourney: Tournament): Tournament {
  if (tourney.options.format === 'remote') {
    throw Error('tournament is remote');
  }

  const noResult = tourney.matches.some(
    (m) => m.round === tourney.currentRound && !m.result
  );
  if (noResult) throw Error('there are unfinished matches');

  if (tourney.currentRound === tourney.options.maxRounds)
    throw Error('tourney ended already');

  tourney.currentRound += 1;

  tourney = setPlayersPoints(tourney);

  // calculate tiebreakers for each player based on points set
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }

  switch (tourney.options.format) {
    case 'swiss':
      switch (tourney.options.playoffsFormat) {
        case 'single-elim':
          if (hasSwissEnded(tourney)) {
            tourney.inPlayoffs = true;
            tourney = createPlayoffsBracket(tourney);
          } else if (tourney.inPlayoffs) {
            tourney = singleEliminationNextRound(tourney);
          } else {
            tourney = pairOpponents(tourney);
          }
          break;
        case 'double-elim':
          if (hasSwissEnded(tourney)) {
            tourney.inPlayoffs = true;
            tourney = createPlayoffsBracket(tourney);
          } else if (tourney.inPlayoffs && tourney.options.maxRounds) {
            const swissRoundsDoubleElim =
              tourney.options.maxRounds -
              calculateDoubleElimMaxRounds(tourney.options.cutLimit);

            tourney = doubleEliminationNextRound(
              tourney,
              tourney.currentRound - swissRoundsDoubleElim
            );
          } else {
            tourney = pairOpponents(tourney);
          }
          break;
        default:
          tourney = pairOpponents(tourney);
          break;
      }
      break;
    case 'single-elim':
      tourney = singleEliminationNextRound(tourney);
      break;
    case 'double-elim':
      tourney = doubleEliminationNextRound(tourney);

      break;
  }

  return tourney;
}
