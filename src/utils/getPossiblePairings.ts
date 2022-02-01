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
      if (forbidden.has(opponent.blossomId)) continue;
      const playerIndex = standings.findIndex(
        (p) => p.blossomId === player.blossomId
      );
      const opponentIndex = standings.findIndex(
        (p) => p.blossomId === opponent.blossomId
      );

      //pairings on top need to have a higher value, so they have priority in being paired.
      for (const standing of standings) {
      }
      if (
        possible.find(
          (ps) =>
            (ps[0] === player.blossomId && ps[1] === opponent.blossomId) ||
            (ps[1] === player.blossomId && ps[0] === opponent.blossomId)
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

      possible.push([player.blossomId, opponent.blossomId, min]);
    }
  }
  return possible;
}
