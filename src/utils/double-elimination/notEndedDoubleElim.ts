import { Match } from '../../types/Match';
import { Tournament } from '../../types/Tournament';

export default function notEndedDoubleElim(tourney: Tournament): boolean {
  // Any round before the two last the tournament should not end
  if (tourney.currentRound < tourney.options.maxRounds - 2) return true;

  const winnersFinal: Match[] = tourney.matches.filter(
    (match) => match.round === tourney.options.maxRounds - 1
  );

  // If the winners final havent happend yet the tournament should not end
  if (winnersFinal.length !== 1 || !winnersFinal[0].result) return true;

  // If the player from the losers win the winners final the tournamento should not end
  if (
    tourney.currentRound === tourney.options.maxRounds - 1 &&
    winnersFinal[0].result.p1 < winnersFinal[0].result.p2
  )
    return true;

  return false;
}
