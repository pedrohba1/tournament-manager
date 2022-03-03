import { Player, Tournament } from '../../src';

export default function isPair(
  player1Id: string,
  player2Id: string,
  tourney: Tournament
): boolean {
  const currentMatches = tourney.matches.filter(
    (m) => m.round === tourney.currentRound
  );

  const found = currentMatches.find((m) => {
    return (
      (m.playerOne.id === player1Id && m.playerTwo.id === player2Id) ||
      (m.playerOne.id === player2Id && m.playerTwo.id === player1Id)
    );
  });
  console.log(found);
  return found ? true : false;
}
