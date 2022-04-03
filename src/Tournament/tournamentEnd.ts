import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import getStandings from '../utils/getStandings';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';

export default function tournamentEnd(tourney: Tournament): Player[] {
  if (tourney.currentRound !== tourney.options.maxRounds)
    throw Error('not in final round');

  tourney = setPlayersPoints(tourney);
  // calculate tiebreakers for each player based on points set
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }
  tourney.ended = true;
  const standings = getStandings(tourney.players);
  return standings;
}
