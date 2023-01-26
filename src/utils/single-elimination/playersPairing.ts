import { Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';
import { calculateSingleElimMaxRounds } from '../calculateSingleElimMaxRounds';

export default function playersPairing(
  matches: Matches,
  players: Player[],
  tourney: Tournament,
  winners = true
): void {
  const exponent = calculateSingleElimMaxRounds(players.length);
  const bracket = [0, 1];

  for (let i = 2; i <= Math.floor(exponent); i++) {
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
}
