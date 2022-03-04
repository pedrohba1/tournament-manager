import { Player, Tournament } from '..';
import { debug } from './debug';
import getForbiddenPairings from './getForbbidenPairings';
import getStandings from './getStandings';
import readableStandings from './readableStandings';
import getCurrentRoundMatch from './getCurrentRoundMatch';

export default function getPossiblePairngs(tourney: Tournament) {
  const possible = [];
  const standings = getStandings(tourney.players).filter((p) => p.active);

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

      const pScore = player.tiebreakers.matchPoints + player.tiebreakers.gamePoints
      const oppScore = opponent.tiebreakers.matchPoints + opponent.tiebreakers.gamePoints

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
