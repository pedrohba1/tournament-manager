import { Tournament } from '../types/Tournament';

export default function setMaxRound(tourney: Tournament): Tournament {
  const playersAmount = tourney.players.filter((p) => p.active).length;
  let maxRounds = 0;

  switch (tourney.options.format) {
    case 'swiss':
      if (!tourney.options.playoffs) {
        if (playersAmount === 2) maxRounds = 1;
        if (playersAmount >= 3 && playersAmount <= 4) maxRounds = 2;
        if (playersAmount >= 5 && playersAmount <= 7) maxRounds = 3;
        if (playersAmount >= 8 && playersAmount <= 16) maxRounds = 4;
        if (playersAmount >= 17 && playersAmount <= 32) maxRounds = 5;
        if (playersAmount >= 33 && playersAmount <= 64) maxRounds = 6;
        if (playersAmount >= 65 && playersAmount <= 128) maxRounds = 7;
        if (playersAmount >= 129 && playersAmount <= 212) maxRounds = 8;
        if (playersAmount >= 213 && playersAmount <= 384) maxRounds = 9;
        if (playersAmount >= 385 && playersAmount <= 627) maxRounds = 10;
      } else {
        if (tourney.options.playoffsFormat === 'single-elim') {
          if (playersAmount >= 3 && playersAmount <= 4)
            maxRounds = 2 + Math.ceil(Math.log2(tourney.options.cutLimit));
          if (playersAmount >= 5 && playersAmount <= 7)
            maxRounds = 3 + Math.ceil(Math.log2(tourney.options.cutLimit));
          if (playersAmount >= 8 && playersAmount <= 16)
            maxRounds = 4 + Math.ceil(Math.log2(tourney.options.cutLimit));
        } else {
          if (playersAmount >= 3 && playersAmount <= 4)
            maxRounds =
              2 + 2 * Math.ceil(Math.log2(tourney.options.cutLimit)) + 1;
          if (playersAmount >= 5 && playersAmount <= 7)
            maxRounds =
              3 + 2 * Math.ceil(Math.log2(tourney.options.cutLimit)) + 1;
          if (playersAmount >= 8 && playersAmount <= 16)
            maxRounds =
              4 + 2 * Math.ceil(Math.log2(tourney.options.cutLimit)) + 1;
        }
      }
      break;
    case 'single-elim':
      maxRounds = Math.ceil(Math.log2(playersAmount));
      break;
    case 'double-elim':
      maxRounds = 2 * Math.ceil(Math.log2(playersAmount)) + 1;
      break;
  }

  if (maxRounds < tourney.options.maxRounds || !tourney.options.maxRounds) {
    tourney.options.maxRounds = maxRounds;
  }

  return tourney;
}
