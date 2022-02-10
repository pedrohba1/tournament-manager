import { Tournament } from '../types/Tournament';

export default function setMaxRound(tourney: Tournament): Tournament {
  const playersAmount = tourney.players.filter((p) => p.active).length;
  let maxRounds = 0;
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

  if (maxRounds < tourney.options.maxRounds || !tourney.options.maxRounds) {
    tourney.options.maxRounds = maxRounds;
  }

  return tourney;
}
