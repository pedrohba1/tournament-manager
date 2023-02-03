import { Tournament } from '../../types/Tournament';
import { calculateDoubleElimMaxRounds } from '../calculateDoubleElimMaxRounds';
import { calculateSingleElimMaxRounds } from '../calculateSingleElimMaxRounds';

export default function hasSwissEnded(tourney: Tournament): boolean {
  const { maxRounds } = tourney.options;
  const playoffsRounds =
    tourney.options.playoffsFormat === 'single-elim'
      ? calculateSingleElimMaxRounds(tourney.options.cutLimit)
      : calculateDoubleElimMaxRounds(tourney.options.cutLimit);

  if (maxRounds) return tourney.currentRound - 1 === maxRounds - playoffsRounds;

  return false;
}
