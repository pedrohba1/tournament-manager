import { Tournament } from '../types/Tournament';
import { debug } from './debug';
import getForbiddenPairings from './getForbbidenPairings';
import getStandings from './getStandings';
import getCurrentRoundMatch from './getCurrentRoundMatch';

type ITuple = [number, number, number];
type IPossibleTuple = [ITuple, ITuple];

export default function getPossiblePairings(
  tourney: Tournament
): IPossibleTuple {
  const possible = ([] as unknown) as IPossibleTuple;
  const standings = getStandings(tourney).filter((p) => p.active);

  for (const player of tourney.players) {
    if (!player.active) continue;
    if (getCurrentRoundMatch(tourney, player.id)) continue;
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

      if (
        possible.find(
          (ps) =>
            (ps[0] === player.blossomId && ps[1] === opponent.blossomId) ||
            (ps[1] === player.blossomId && ps[0] === opponent.blossomId)
        )
      )
        continue;

      const pHeight = Math.abs(playerIndex - standings.length);
      const oppHeight = Math.abs(opponentIndex - standings.length);

      const playerDiff = Math.abs(oppHeight - pHeight);
      const min = 80 / Math.log10(playerDiff + 2);

      possible.push([player.blossomId, opponent.blossomId, min]);
    }
  }
  debug(possible);
  return possible;
}
