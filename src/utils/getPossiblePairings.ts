import { Player, Tournament } from '..';
import getForbiddenPairings from './getForbbidenPairings';
import getStandings from './getStandings';

export default function getPossiblePairngs(tourney: Tournament) {
  const possible = [];
  const standings = getStandings(tourney.players);
  for (const player of tourney.players) {
    const forbidden = getForbiddenPairings(player, tourney);
    for (const opponent of standings) {
      if (forbidden.has(opponent.id)) continue;
      const playerIndex = standings.findIndex((p) => p.id === player.id);
      const opponentIndex = standings.findIndex((p) => p.id === opponent.id);

      if (
        possible.find(
          (ps) =>
            (ps[0] === player.id && ps[1] === opponent.id) ||
            (ps[1] === player.id && ps[0] === opponent.id)
        )
      )
        continue;
      possible.push([
        player.id,
        opponent.id,
        10 / Math.abs(playerIndex - opponentIndex),
      ]);
    }
  }
  return possible;
}
