import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';

export default function nextRound(tourney: Tournament): Tournament {
  // throws error if a match has no result
  if (tourney.matches.find((m) => m.result === null))
    throw Error('cant start next round if match has no result');

  tourney = setPlayersPoints(tourney);
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }

  // pairs players accordingly

  return tourney;
}
