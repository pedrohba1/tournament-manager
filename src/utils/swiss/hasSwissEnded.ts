import { Tournament } from '../../types/Tournament';
import { calculateDoubleElimMaxRounds } from '../calculateDoubleElimMaxRounds';
import { calculateSingleElimMaxRounds } from '../calculateSingleElimMaxRounds';

export default function hasSwissEnded(tourney: Tournament): boolean {
  const playoffsRounds =
    tourney.options.playoffsFormat === 'single-elim'
      ? calculateSingleElimMaxRounds(tourney.options.cutLimit)
      : calculateDoubleElimMaxRounds(tourney.options.cutLimit);

  return (
    tourney.currentRound - 1 === tourney.options.maxRounds - playoffsRounds
  );
}
