import { Matches } from '../types/Match';
import { Player } from '../types/Player';

export default function getMatchesLosers(matches: Matches): Player[] {
  const losers: Player[] = [];

  for (const match of matches) {
    if (match.result.p1 > match.result.p2) {
      if (!match.playerTwo.bye) {
        losers.push(match.playerTwo);
      }
    } else {
      losers.push(match.playerOne);
    }
  }

  return losers;
}
