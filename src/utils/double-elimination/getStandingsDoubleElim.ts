import { Match, Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import getStandingsSingleElim from '../single-elimination/getStandingsSingleElim';

export default function getStandingsDoubleElim(
  matches: Matches,
  players: Player[]
): Player[] {
  const eliminationMatches: Matches = [];
  const grandFinal: Match = matches.pop();

  for (const match of matches) {
    if (!match.winners) {
      eliminationMatches.push(match);
    }
  }

  eliminationMatches.push(grandFinal);
  return getStandingsSingleElim(eliminationMatches, players);
}
