import { Matches } from '../../types/Match';
import { Player } from '../../types/Player';

export default function getStandingsSingleElim(
  matches: Matches,
  players: Player[]
): Player[] {
  const standings: string[] = [];
  const lastIndex = matches.length - 1;

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].result.p1 > matches[i].result.p2) {
      if (!matches[i].playerTwo.bye) {
        standings.push(matches[i].playerTwo.id);
        if (lastIndex === i) {
          standings.push(matches[i].playerOne.id);
        }
      }
    } else {
      standings.push(matches[i].playerOne.id);
      if (lastIndex === i) {
        standings.push(matches[i].playerTwo.id);
      }
    }
  }

  const sortedPlayers = players;

  sortedPlayers.sort(
    (a, b) => standings.indexOf(b.id) - standings.indexOf(a.id)
  );

  return sortedPlayers;
}
