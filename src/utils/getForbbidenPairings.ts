import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function getForbiddenPairings(
  player: Player,
  tourney: Tournament
): Set<number> {
  const forbiddenPairings = new Set<number>();
  //player cant be paired with himself:
  forbiddenPairings.add(player.blossomId);
  //player can't be paired with anyone else that it has faced
  // get all players this player HAS played against:
  const allPlayerPastMatches = tourney.matches.filter(
    (m) =>
      m.playerOne.blossomId === player.blossomId ||
      (m.playerTwo.blossomId === player.blossomId &&
        m.round < tourney.currentRound)
  );
  //put all his past opponents into the forbidden pairings
  for (const match of allPlayerPastMatches) {
    if (match.playerOne.blossomId !== player.blossomId && !match.playerOne.bye)
      forbiddenPairings.add(match.playerOne.blossomId);
    if (match.playerTwo.blossomId !== player.blossomId && !match.playerTwo.bye)
      forbiddenPairings.add(match.playerTwo.blossomId);
  }

  //get all players from current round matches, they cant be paired with:
  const currentMatchPairs = tourney.matches.filter(
    (m) => m.round === tourney.currentRound
  );
  for (const match of currentMatchPairs) {
    if (!match.playerOne.bye) forbiddenPairings.add(match.playerOne.blossomId);
    if (!match.playerTwo.bye) forbiddenPairings.add(match.playerTwo.blossomId);
  }

  return forbiddenPairings;
}
