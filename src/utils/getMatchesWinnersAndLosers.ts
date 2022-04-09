import { Matches } from '../types/Match';
import { Player } from '../types/Player';

export default function getMatchesWinnersAndLosers(matches: Matches): any {
  const winners: Player[] = [];
  const losers: Player[] = [];

  for (const match of matches) {
    if (match.result.p1 > match.result.p2) {
      winners.push(match.playerOne);
      if (!match.playerTwo.bye) {
        losers.push(match.playerTwo);
      }
    } else {
      winners.push(match.playerTwo);
      losers.push(match.playerOne);
    }
  }

  return { winners, losers };
}
