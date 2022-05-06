import { Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';
import getMatchesWinners from '../getMatchesWinners';

export default function advanceBracket(
  newMatches: Matches,
  finalizedMatches: Matches,
  tourney: Tournament,
  winnersBracket = true
): void {
  const winners = getMatchesWinners(finalizedMatches);
  const totalSlots = 2 ** Math.ceil(Math.log2(winners.length));

  for (let i = 0; i < totalSlots; i += 2) {
    newMatches.push(
      createNewMatch(winners[i], winners[i + 1], tourney, winnersBracket)
    );
  }
}
