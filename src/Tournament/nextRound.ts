import { Tournament } from '../types/Tournament';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import pairOpponents from '../utils/pairOpponents';
import singleEliminationNextRound from '../utils/single-elimination/singleEliminationNextRound';
import doubleEliminationNextRound from '../utils/double-elimination/doubleEliminationNextRound';

export default function nextRound(tourney: Tournament): Tournament {
  // throws error if a match has no result
  if (tourney.matches.find((m) => m.result === null))
    throw Error('cant start next round if match has no result');

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
      tourney = pairOpponents(tourney);
      break;
    case 'single-elim':
      tourney = singleEliminationNextRound(tourney);
      break;
    case 'double-elim':
      tourney = doubleEliminationNextRound(tourney);
      break;
  }

  // increment round
  // pairs players according to

  return tourney;
}
