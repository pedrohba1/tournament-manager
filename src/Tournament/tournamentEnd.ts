import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import getStandings from '../utils/getStandings';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import notEndedDoubleElim from '../utils/double-elimination/notEndedDoubleElim';
import getStandingsSingleElim from '../utils/single-elimination/getStandingsSingleElim';

export default function tournamentEnd(tourney: Tournament): Player[] {
  if (
    tourney.options.format !== 'double-elim' &&
    tourney.currentRound !== tourney.options.maxRounds
  )
    throw Error('not in final round');

  if (tourney.options.format === 'double-elim' && notEndedDoubleElim(tourney))
    throw Error('not in final round');

  tourney = setPlayersPoints(tourney);
  // calculate tiebreakers for each player based on points set
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }
  tourney.ended = true;

  if (tourney.options.format == 'single-elim') {
    const standings = getStandingsSingleElim(tourney.matches, tourney.players);
    return standings;
  }
  if (tourney.options.format == 'double-elim') {
    const standings = getStandingsSingleElim(tourney.matches, tourney.players);
    return standings;
  }

  const standings = getStandings(tourney.players);

  return standings;
}
