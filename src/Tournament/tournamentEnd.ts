import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import getStandings from '../utils/getStandings';
import setPlayersPoints from '../utils/setPlayerPoints';
import calculateTiebreakers from '../utils/calculateTiebreakers';
import notEndedDoubleElim from '../utils/double-elimination/notEndedDoubleElim';
import getStandingsSingleElim from '../utils/single-elimination/getStandingsSingleElim';
import getStandingsDoubleElim from '../utils/double-elimination/getStandingsDoubleElim';
import getRemoteStandings from '../utils/remote/getRemoteStandings';

export default function tournamentEnd(tourney: Tournament): Player[] {
  if (
    tourney.options.format !== 'double-elim' &&
    tourney.options.format !== 'remote' &&
    tourney.options.playoffsFormat !== 'double-elim' &&
    tourney.currentRound !== tourney.options.maxRounds
  )
    throw Error('not in final round');

  if (
    (tourney.options.format === 'double-elim' ||
      tourney.options.playoffsFormat === 'double-elim') &&
    notEndedDoubleElim(tourney)
  )
    throw Error('not in final round');

  tourney = setPlayersPoints(tourney);
  // calculate tiebreakers for each player based on points set
  for (const player of tourney.players) {
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
  }

  tourney.ended = true;

  let standings: Player[] = [];
  switch (tourney.options.format) {
    case 'single-elim':
      standings = getStandingsSingleElim(tourney.matches, tourney.players);
      return standings;
    case 'double-elim':
      standings = getStandingsDoubleElim(tourney.matches, tourney.players);
      return standings;
    case 'swiss':
      standings = getStandings(tourney);
      return standings;
    case 'remote':
      standings = getRemoteStandings(tourney);
      return standings;
    default:
      throw Error('no format specified');
      break;
  }
  return standings;
}
