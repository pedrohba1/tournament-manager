import { Player, Tournament } from '..';
import getForbiddenPairings from './getForbbidenPairings';
import getStandings from './getStandings';
import readableStandings from './readableStandings';

export default function getPossiblePairngs(tourney: Tournament) {
  const possible = [];
  const standings = getStandings(tourney.players);

  // readableStandings(getStandings(tourney.players));

  for (const player of tourney.players) {
    if (!player.active) continue;
    const forbidden = getForbiddenPairings(player, tourney);
    for (const opponent of standings) {
      if (!opponent.active) continue;
      if (forbidden.has(opponent.id)) continue;
      const playerIndex = standings.findIndex((p) => p.id === player.id);
      const opponentIndex = standings.findIndex((p) => p.id === opponent.id);

      //pairings on top need to have a higher value, so they have priority in being paired.
      for (const standing of standings) {
      }
      if (
        possible.find(
          (ps) =>
            (ps[0] === player.id && ps[1] === opponent.id) ||
            (ps[1] === player.id && ps[0] === opponent.id)
        )
      )
        continue;

      const pScore =
        player.tiebreakers.matchPoints && player.tiebreakers.gamePoints
          ? player.tiebreakers.matchPoints + player.tiebreakers.gamePoints
          : 1;

      const oppScore =
        opponent.tiebreakers.matchPoints && opponent.tiebreakers.gamePoints
          ? opponent.tiebreakers.matchPoints + opponent.tiebreakers.gamePoints
          : 1;

      const min =
        Math.abs(100 / (playerIndex - opponentIndex)) * 20 +
        player.tiebreakers.byes * 10 +
        (pScore + oppScore);

      possible.push([player.id, opponent.id, min]);
    }
  }
  return possible;
}
