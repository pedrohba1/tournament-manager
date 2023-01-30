import { Matches } from '../types/Match';
import { Player } from '../types/Player';

export default function getMatchesWinners(matches: Matches): Player[] {
  const winners: Player[] = [];

  for (const match of matches) {
    const currentMatchResult = match.result;

    if (!currentMatchResult)
      throw new Error(
        `Match number ${match.matchNumber} has no result settled.`
      );

    if (currentMatchResult.p1 > currentMatchResult.p2) {
      winners.push(match.playerOne);
    } else {
      winners.push(match.playerTwo);
    }
  }

  return winners;
}
