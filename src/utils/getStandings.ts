import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function getStandings(tourney: Tournament): Player[] {
  const sortedPlayers = tourney.players;
  sortedPlayers.sort((a, b) => {
    if (a.tiebreakers.matchPoints === b.tiebreakers.matchPoints) {
      // if match points are the same, calculate based on opmwp's
      // omwp the lesser the better
      if (a.tiebreakers.omwp !== b.tiebreakers.omwp) {
        return a.tiebreakers.omwp < b.tiebreakers.omwp ? 1 : -1;
      }

      // if both match points and omwp's are the same, calculate based on gwp's
      // gwp the greater the better
      if (a.tiebreakers.gwp !== b.tiebreakers.gwp) {
        return a.tiebreakers.gwp > b.tiebreakers.gwp ? 1 : -1;
      }

      // if it ties on matchPpoints, omwp's and gwp's, try to order by ogwp's
      if (a.tiebreakers.ogwp !== b.tiebreakers.ogwp) {
        return a.tiebreakers.ogwp < b.tiebreakers.ogwp ? 1 : -1;
      }
      // if none of the above work, order them in any way
      return 1;
    }

    return a.tiebreakers.matchPoints < b.tiebreakers.matchPoints ? 1 : -1;
  });
  return sortedPlayers;
}