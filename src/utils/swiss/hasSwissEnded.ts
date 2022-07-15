import { Tournament } from '../../types/Tournament';

export default function hasSwissEnded(tourney: Tournament): boolean {
  const playoffsRounds =
    tourney.options.playoffsFormat === 'single-elim'
      ? Math.ceil(Math.log2(tourney.options.cutLimit))
      : 2 * Math.ceil(Math.log2(tourney.options.cutLimit)) + 1;

  return (
    tourney.currentRound - 1 === tourney.options.maxRounds - playoffsRounds
  );
}
