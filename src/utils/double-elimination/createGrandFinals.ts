import { Match, Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';

export default function createGrandFinals(
  winnersMatches: Matches,
  losersMatches: Matches,
  tourney: Tournament
): Match {
  const winnerMatchResult = winnersMatches[0].result;
  const loserMatchResult = losersMatches[0].result;

  if (!winnerMatchResult || !loserMatchResult)
    throw new Error("There's no result settled for winners or losers");

  const winnerWb =
    winnerMatchResult.p1 > winnerMatchResult.p2
      ? winnersMatches[0].playerOne
      : winnersMatches[0].playerTwo;
  const winnerLb =
    loserMatchResult.p1 > loserMatchResult.p2
      ? losersMatches[0].playerOne
      : losersMatches[0].playerTwo;

  // Player One must come from winners bracket and player two must como from losers
  return createNewMatch(winnerWb, winnerLb, tourney);
}
