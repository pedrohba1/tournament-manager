import { Player } from '../../types/Player';

export default function getStandingsSwiss(players: Player[]): Player[] {
  const sortedPlayers = players;
  sortedPlayers.sort((a, b) => {
    if (a.tiebreakers.matchPoints === b.tiebreakers.matchPoints) {
      // if (a.tiebreakers.gamePoints !== b.tiebreakers.gamePoints) {
      //   return a.tiebreakers.gamePoints < b.tiebreakers.gamePoints ? 1 : -1;
      // }
      // if player byes are greater then others, it goes down.
      if (a.tiebreakers.byes !== b.tiebreakers.byes) {
        return a.tiebreakers.byes > b.tiebreakers.byes ? 1 : -1;
      }

      // if match points are the same, calculate based on opmwp's
      // omwp the lesser the better
      if (a.tiebreakers.omwp !== b.tiebreakers.omwp) {
        return a.tiebreakers.omwp < b.tiebreakers.omwp ? 1 : -1;
      }

      // if both match points and omwp's are the same, calculate based on gwp's
      // gwp the greater the better
      if (a.tiebreakers.gwp !== b.tiebreakers.gwp) {
        return a.tiebreakers.gwp < b.tiebreakers.gwp ? 1 : -1;
      }

      // if it ties on matchPpoints, omwp's and gwp's, try to order by ogwp's
      if (a.tiebreakers.ogwp !== b.tiebreakers.ogwp) {
        return a.tiebreakers.ogwp < b.tiebreakers.ogwp ? 1 : -1;
      }
      // if none of the above work, order them in any way
      return -1;
    }

    return a.tiebreakers.matchPoints < b.tiebreakers.matchPoints ? 1 : -1;
  });
  return sortedPlayers;
}
