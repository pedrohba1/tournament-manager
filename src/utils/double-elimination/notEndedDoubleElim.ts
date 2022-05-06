import { Match } from '../../types/Match';
import { Tournament } from '../../types/Tournament';

export default function notEndedDoubleElim(tourney: Tournament): boolean {
  // Any round before the two last the tournament should not end
  if (tourney.currentRound < tourney.options.maxRounds - 2) return true;

  const grandFinal: Match[] = tourney.matches.filter(
    (match) => match.round === tourney.options.maxRounds - 1
  );

  // If the winners final havent happend yet the tournament should not end
  if (grandFinal.length !== 1 || !grandFinal[0].result) return true;

  // If the player from the losers win the winners final the tournament should not end
  if (
    tourney.currentRound === tourney.options.maxRounds - 1 &&
    grandFinal[0].result.p1 < grandFinal[0].result.p2
  )
    return true;

  // If the result from the grand final reset was not set the tournament should not end

  const grandFinalReset: Match[] = tourney.matches.filter(
    (match) => match.round === tourney.options.maxRounds
  );

  // If the winners final havent happend yet the tournament should not end
  if (grandFinalReset.length === 1 && !grandFinalReset[0].result) return true;

  return false;
}
