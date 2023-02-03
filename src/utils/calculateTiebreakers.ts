import { Tournament } from '../types/Tournament';
import { Player } from '../types/Player';
import { debug } from './debug';

export default function calculateTiebreakers(
  player: Player,
  tourney: Tournament
): Player {
  const { tiebreakers } = player;
  const { matchPoints, gamePoints } = tiebreakers;

  // filter matches that his player participated
  // filter byes
  const playerMatches = tourney.matches.filter(
    (item) => item.playerOne.id === player.id || item.playerTwo.id === player.id
  );

  /**
   * Match-win percentage:
   * A players match-win percentage is that
   * play accumulated match points divided by 3 times
   * the number of rounds in which he or she competed, or 0.33
   */

  const mwp =
    matchPoints / (playerMatches.length * 3) < 0.33
      ? 0.33
      : matchPoints / (playerMatches.length * 3);

  /**
   * Opponent's match-win percentage: A players opponents match-win percentage
   * is the average match-win percentage of each opponent that
   * player faced (ignoring those rounds for which the player received a bye)
   */
  debug('omwp of player', player.id);
  let acc = 0;
  for (const match of playerMatches) {
    debug('match of player', match.matchNumber);
    // get single oppopnet (desconsider byes)
    const opponent =
      match.playerOne.id !== player.id ? match.playerOne : match.playerTwo;
    if (opponent.bye) {
      acc += 0;
      continue;
    }

    // get opponent matches
    const opponentMatches = tourney.matches.filter(
      (m) => m.playerOne.id === opponent.id || m.playerTwo.id === opponent.id
    );

    // calculate opponent match win percentage and sum in the accumulator
    const foundPlayer = tourney.players.find((p) => p.id === opponent.id);
    if (foundPlayer) {
      const { matchPoints } = foundPlayer.tiebreakers;
      debug('result of acc', matchPoints / (opponentMatches.length * 3));
      acc +=
        matchPoints / (opponentMatches.length * 3) < 0.33
          ? 0.33
          : matchPoints / (opponentMatches.length * 3);
    }
  }
  const omwp = acc / playerMatches.length;

  /**
   * Game-win percentage:
   * Similar to the match-win percentage,
   * a players game-win percentage is the total
   * number of game points he or she earned divided by 3 times the number of games played.
   */
  const { w, l, d } = player.tiebreakers.gamesSummary;
  const allGames = w + l + d;
  debug('gwp of ', player.id);
  const gwp =
    gamePoints / (allGames * 3) < 0.33 ? 0.33 : gamePoints / (allGames * 3);
  debug('gwp = ', gamePoints, '/', allGames * 3);

  /**
   *  Opponent's game-win percentages:
   * Similar to opponents’ match-win percentage, a player’s opponents’ game-win percentage is sim-
   * ply the average game-win percentage of all of that player’s opponents. And, as with opponents’
   * match-win percentage, each opponent has a minimum game-win percentage of 0.33.
   */
  let acc2 = 0;
  debug('ogwp of player', player.id);
  for (const match of playerMatches) {
    // get single oppopnet (desconsider byes)
    const opponent =
      match.playerOne.id !== player.id ? match.playerOne : match.playerTwo;

    if (opponent.bye) {
      acc += 0;
      continue;
    }
    // calculate opponent game win percentage and sum in the accumulator
    const foundPlayer = tourney.players.find((p) => p.id === opponent.id);
    if (foundPlayer) {
      const {
        tiebreakers: { gamesSummary, gamePoints },
      } = foundPlayer;
      const { w, l, d } = gamesSummary;
      const allGames = w + l + d;
      debug('gwp of opponet', opponent.id);
      acc2 +=
        gamePoints / (allGames * 3) < 0.33 ? 0.33 : gamePoints / (allGames * 3);
      debug(
        gamePoints,
        '/',
        allGames * 3,
        '=',
        gamePoints / (allGames * 3) < 0.33 ? 0.33 : gamePoints / (allGames * 3)
      );
    }
  }
  const ogwp = acc2 / playerMatches.length;
  debug('ogwp of', player.id, ':', ogwp);

  player.tiebreakers = {
    ...tiebreakers,
    mwp,
    omwp,
    ogwp,
    gwp,
  };

  return player;
}
