import { Match, Matches } from '../../types/Match';
import { Player } from '../../types/Player';

export default function getStandingsSingleElim(
  matches: Matches,
  players: Player[]
): Player[] {
  const standings: any[] = [];
  const grandFinal: Match = matches.shift();

  if (grandFinal.result.p1 > grandFinal.result.p2) {
    standings.push(grandFinal.playerOne.id);
    standings.push(grandFinal.playerTwo.id);
  } else {
    standings.push(grandFinal.playerTwo.id);
    standings.push(grandFinal.playerOne.id);
  }

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].result.p1 > matches[i].result.p2) {
      if (!matches[i].playerTwo.bye) {
        standings.push(matches[i].playerTwo.id);
      }
    } else {
      standings.push(matches[i].playerOne.id);
    }
  }

  const sortedPlayers = players;
  sortedPlayers.sort(
    (a, b) => standings.indexOf(a.id) - standings.indexOf(b.id)
  );

  return sortedPlayers;
}
