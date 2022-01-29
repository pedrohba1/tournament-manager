import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';

export default function pairOpponents(tourney: Tournament): Tournament {
  let pairingPlayers = tourney.players;

  // first, removes from the array the players that have been dropped:
  pairingPlayers = pairingPlayers.filter((p) => p.active === true);

  // then orders players in descending order (first is best last is worst)
  pairingPlayers.sort((a, b) => {
    if (a.tiebreakers.matchPoints === b.tiebreakers.matchPoints) {
      // if match points are the same, calculate based on opmwp's
      if (a.tiebreakers.omwp !== b.tiebreakers.omwp) {
        return a.tiebreakers.omwp < b.tiebreakers.omwp ? 1 : -1;
      }

      // if both match points and omwp's are the same, calculate based on gwp's
      if (a.tiebreakers.gwp !== b.tiebreakers.gwp) {
        return a.tiebreakers.gwp < b.tiebreakers.gwp ? 1 : -1;
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

  console.log(pairingPlayers);

  // from pairingPlayers, create new matches were the best are paired with the best and the worst with the worts

  return tourney;
}
