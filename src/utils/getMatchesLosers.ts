import { Matches } from '../types/Match';
import { Player } from '../types/Player';

export default function getMatchesLosers(matches: Matches): Player[] {
  const losers: Player[] = [];

  for (const match of matches) {
    const currentMatchResult = match.result;
    if (!currentMatchResult)
      throw new Error(
        `Match number ${match.matchNumber} has no result settled.`
      );

    if (currentMatchResult.p1 > currentMatchResult.p2) {
      if (!match.playerTwo.bye) {
        losers.push(match.playerTwo);
      }
    } else {
      losers.push(match.playerOne);
    }
  }

  return losers;
}
