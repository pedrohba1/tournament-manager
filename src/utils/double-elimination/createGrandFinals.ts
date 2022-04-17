import { Match, Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';

export default function createGrandFinals(
  winnersMatches: Matches,
  losersMatches: Matches,
  tourney: Tournament
): Match {
  const winnerWb =
    winnersMatches[0].result.p1 > winnersMatches[0].result.p2
      ? winnersMatches[0].playerOne
      : winnersMatches[0].playerTwo;
  const winnerLb =
    losersMatches[0].result.p1 > losersMatches[0].result.p2
      ? losersMatches[0].playerOne
      : losersMatches[0].playerTwo;

  // Player One must come from winners bracket and player two must como from losers
  return createNewMatch(winnerWb, winnerLb, tourney);
}
