import { Tournament } from '../types/Tournament';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import pairOpponents from '../utils/pairOpponents';
import singleEliminationNextRound from '../utils/single-elimination/singleEliminationNextRound';
import doubleEliminationNextRound from '../utils/double-elimination/doubleEliminationNextRound';
import grandFinalReset from '../utils/double-elimination/grandFinalReset';
import createPlayoffsBracket from '../utils/swiss/createPlayoffsBracket';

export default function nextRound(tourney: Tournament): Tournament {
  // throws error if a match has no result
  if (tourney.matches.find((m) => m.result === null))
    throw Error('cant start next round if match has no result');

  if (
    (tourney.options.playoffsFormat === 'double-elim' ||
      tourney.options.format === 'double-elim') &&
    tourney.currentRound === tourney.options.maxRounds - 1
  )
    return grandFinalReset(tourney);

  if (tourney.currentRound === tourney.options.maxRounds)
    throw Error('tourney ended already');

  //checks if there is some match of the current round that does not have a reuslt.
  // if there is a match without result throw an error:
  const noResult = tourney.matches.some(
    (m) => m.round === tourney.currentRound && !m.result
  );
  if (noResult) throw Error('there are unfinished matches');

  //increment round
  tourney.currentRound += 1;
  // set points first
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
          if (
            tourney.currentRound - 1 <
            tourney.options.maxRounds -
              Math.ceil(Math.log2(tourney.options.cutLimit))
          ) {
            tourney = pairOpponents(tourney);
          } else if (
            tourney.currentRound - 1 ===
            tourney.options.maxRounds -
              Math.ceil(Math.log2(tourney.options.cutLimit))
          ) {
            tourney = createPlayoffsBracket(tourney);
          } else {
            tourney = singleEliminationNextRound(tourney);
          }
          break;
        case 'double-elim':
          const swissRoundsDoubleElim =
            tourney.options.maxRounds -
            2 * Math.ceil(Math.log2(tourney.options.cutLimit)) -
            1;
          if (tourney.currentRound - 1 < swissRoundsDoubleElim) {
            // Case playoffs havent started yet
            tourney = pairOpponents(tourney);
          } else if (tourney.currentRound - 1 === swissRoundsDoubleElim) {
            // Case init the playoffs
            tourney = createPlayoffsBracket(tourney);
          } else {
            // Case running playoffs
            tourney = doubleEliminationNextRound(
              tourney,
              tourney.currentRound - swissRoundsDoubleElim
            );
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
