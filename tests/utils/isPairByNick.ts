import { Tournament } from '../../src';

export default function isPairByNick(
  player1Nick: string,
  player2Nick: string,
  tourney: Tournament
): boolean {
  const currentMatches = tourney.matches.filter(
    (m) => m.round === tourney.currentRound
  );

  const found = currentMatches.find(
    (m) =>
      (m.playerOne.nickname === player1Nick &&
        m.playerTwo.nickname === player2Nick) ||
      (m.playerOne.nickname === player2Nick &&
        m.playerTwo.nickname === player1Nick)
  );
  return found ? true : false;
}
