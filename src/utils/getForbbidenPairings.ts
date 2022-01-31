import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function getForbiddenPairings(
  player: Player,
  tourney: Tournament
): Set<string> {
  const forbiddenPairings = new Set<string>();
  //player cant be paired with himself:
  forbiddenPairings.add(player.id);
  //player can't be paired with anyone else that it has faced
  // get all players this player HAS played against:
  const allPlayerPastMatches = tourney.matches.filter(
    (m) =>
      m.playerOne.id === player.id ||
      (m.playerTwo.id === player.id && m.round < tourney.currentRound)
  );
  //put all his opponents into the forbidden pairings
  for (const match of allPlayerPastMatches) {
    if (match.playerOne.id !== player.id && !match.playerOne.bye)
      forbiddenPairings.add(match.playerOne.id);
    if (match.playerTwo.id !== player.id && !match.playerTwo.bye)
      forbiddenPairings.add(match.playerTwo.id);
  }

  //get all players from current round matches, they cant be paired with:

  const currentMatchPairs = tourney.matches.filter(
    (m) => m.round === tourney.currentRound
  );
  for (const match of currentMatchPairs) {
    forbiddenPairings.add(match.playerOne.id);
    forbiddenPairings.add(match.playerTwo.id);
  }

  return forbiddenPairings;
}
