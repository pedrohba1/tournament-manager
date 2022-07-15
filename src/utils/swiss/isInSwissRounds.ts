import { Tournament } from '../../types/Tournament';

// Nome não ta legal isso aqui, ta retornando true (se não começou) e false (se começou)
export default function isInSwissRounds(tourney: Tournament): boolean {
  const playoffsRounds =
    tourney.options.playoffsFormat === 'single-elim'
      ? Math.ceil(Math.log2(tourney.options.cutLimit))
      : 2 * Math.ceil(Math.log2(tourney.options.cutLimit)) + 1;

  return tourney.currentRound - 1 < tourney.options.maxRounds - playoffsRounds;
}
