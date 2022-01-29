import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import pairOpponents from '../utils/pairOpponents';

export default function nextRound(tourney: Tournament): Tournament {
  // throws error if a match has no result
  if (tourney.matches.find((m) => m.result === null))
    throw Error('cant start next round if match has no result');

  //checks if there is some match of the current round that does not have a reuslt.
  // if there is a match without result throw an error:
  const noResult = tourney.matches.some(
    (m) => m.round === tourney.currentRound && !m.result
  );
  if (noResult) throw Error('there are unfinished matches');

  // set points first
  tourney = setPlayersPoints(tourney);
  // calculate tiebreakers for each player based on points set
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }

  tourney = pairOpponents(tourney);
  // pairs players according to

  return tourney;
}
