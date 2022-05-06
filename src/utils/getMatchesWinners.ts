import { Matches } from '../types/Match';
import { Player } from '../types/Player';

export default function getMatchesWinners(matches: Matches): Player[] {
  const winners: Player[] = [];

  for (const match of matches) {
    if (match.result.p1 > match.result.p2) {
      winners.push(match.playerOne);
    } else {
      winners.push(match.playerTwo);
    }
  }

  return winners;
}
