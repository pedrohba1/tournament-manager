import { Matches } from '../types/Match';

export default function getBracketStandings(matches: Matches): string[] {
  const standings: string[] = [];

  for (const match of matches) {
    const currentMatchResult = match.result;

    if (!currentMatchResult)
      throw new Error(
        `Match number ${match.matchNumber} has no result settled.`
      );

    if (currentMatchResult.p1 > currentMatchResult.p2) {
      if (!match.playerTwo.bye) {
        standings.push(match.playerTwo.id);
      }
    } else {
      standings.push(match.playerOne.id);
    }
  }

  return standings;
}
