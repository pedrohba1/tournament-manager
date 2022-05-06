import { Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import getMatchesLosers from '../getMatchesLosers';
import getMatchesWinners from '../getMatchesWinners';
import createNewMatch from '../createNewMatch';

export default function sendToLosersBracket(
  newMatches: Matches,
  winnersMatches: Matches,
  losersMatches: Matches,
  tourney: Tournament
): void {
  const losers = getMatchesLosers(winnersMatches);
  const winners = getMatchesWinners(losersMatches);

  for (let i = 0; i < losers.length; i++) {
    newMatches.push(
      createNewMatch(losers[losers.length - i - 1], winners[i], tourney, false)
    );
  }
}
