import { Tournament } from '../types/Tournament';
import { calculateDoubleElimMaxRounds } from '../utils/calculateDoubleElimMaxRounds';
import { calculateSingleElimMaxRounds } from '../utils/calculateSingleElimMaxRounds';

export default function setMaxRound(tourney: Tournament): Tournament {
  const playersAmount = tourney.players.filter((p) => p.active).length;
  let maxRounds = 0;

  switch (tourney.options.format) {
    case 'swiss':
      maxRounds = calculateSingleElimMaxRounds(playersAmount);

      if (
        (tourney.options.maxRounds && maxRounds < tourney.options.maxRounds) ||
        !tourney.options.maxRounds
      )
        tourney.options.maxRounds = maxRounds;

      if (tourney.options.playoffsFormat === 'single-elim') {
        tourney.options.maxRounds += calculateSingleElimMaxRounds(
          tourney.options.cutLimit
        );
      } else if (tourney.options.playoffsFormat === 'double-elim') {
        tourney.options.maxRounds += calculateDoubleElimMaxRounds(
          tourney.options.cutLimit
        );
      }
      break;
    case 'single-elim':
      tourney.options.maxRounds = calculateSingleElimMaxRounds(playersAmount);
      break;
    case 'double-elim':
      tourney.options.maxRounds = calculateDoubleElimMaxRounds(playersAmount);
      break;
  }

  return tourney;
}
