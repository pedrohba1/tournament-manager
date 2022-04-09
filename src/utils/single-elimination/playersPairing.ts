import { Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';

export default function playersPairing(
  players: Player[],
  tourney: Tournament,
  winners = true
): Matches {
  const matches: Matches = [];

  const exponent = Math.ceil(Math.log2(players.length));
  const bracket = [0, 3, 1, 2];

  for (let i = 3; i <= Math.floor(exponent); i++) {
    for (let j = 0; j < bracket.length; j += 2) {
      bracket.splice(j + 1, 0, 2 ** i - 1 - bracket[j]);
    }
  }

  for (let i = 0; i < bracket.length; i += 2) {
    if (players[bracket[i]] || players[bracket[i + 1]]) {
      matches.push(
        createNewMatch(
          players[bracket[i]],
          players[bracket[i + 1]],
          tourney,
          winners
        )
      );
    }
  }

  return matches;
}
