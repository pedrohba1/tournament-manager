import { Matches } from '../types/Match';

export default function getBracketStandings(matches: Matches): string[] {
  const standings: string[] = [];

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].result.p1 > matches[i].result.p2) {
      if (!matches[i].playerTwo.bye) {
        standings.push(matches[i].playerTwo.id);
      }
    } else {
      standings.push(matches[i].playerOne.id);
    }
  }

  return standings;
}
