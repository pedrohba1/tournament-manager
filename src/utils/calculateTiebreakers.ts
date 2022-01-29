import { Tournament } from '../types/Tournament';
import { Player } from '../types/Player';

export default function calculateTiebreakers(
  player: Player,
  tourney: Tournament
): Player {
  const { tiebreakers } = player;
  const { currentRound } = tourney;
  const { matchPoints, gamePoints } = tiebreakers;
  const OpponentsMatchWin = [];
  const OpponentsGameWin = [];
  const PlayerResults = [];

  // filter matches that his player participated
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
   * Opponent match-win percentage: A players opponents match-win percentage
   * is the average match-win percentage of each opponent that
   * player faced (ignoring those rounds for which the player received a bye)
   */
  let acc = 0;
  for (const match of playerMatches) {
    // get single oppopnet (desconsider byes)
    const opponent =
      match.playerOne.id !== player.id ? match.playerOne : match.playerTwo;
    if (opponent.bye === true) continue;

    // get opponent matches
    const opponentMatches = tourney.matches.filter(
      (m) => m.playerOne.id === player.id || m.playerTwo.id === player.id
    );

    // calculate opponent match win percentage and sum in the accumulator
    const {
      tiebreakers: { matchPoints },
    } = tourney.players.find((p) => p.id === opponent.id);
    acc +=
      matchPoints / (opponentMatches.length * 3) < 0.33
        ? 0.33
        : matchPoints / (opponentMatches.length * 3);
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
  const gwp =
    gamePoints / (allGames * 3) < 0.33 ? 0.33 : gamePoints / (allGames * 3);

  /**
   *  Opponents game-win percentages:
   * Similar to opponents’ match-win percentage, a player’s opponents’ game-win percentage is sim-
   * ply the average game-win percentage of all of that player’s opponents. And, as with opponents’
   * match-win percentage, each opponent has a minimum game-win percentage of 0.33.
   */
  let acc2 = 0;
  for (const match of playerMatches) {
    // get single oppopnet (desconsider byes)
    const opponent =
      match.playerOne.id !== player.id ? match.playerOne : match.playerTwo;
    if (opponent.bye === true) continue;

    // get opponent matches
    const opponentMatches = tourney.matches.filter(
      (m) => m.playerOne.id === player.id || m.playerTwo.id === player.id
    );

    // calculate opponent game win percentage and sum in the accumulator
    const {
      tiebreakers: { gamesSummary, gamePoints },
    } = tourney.players.find((p) => p.id === opponent.id);
    const { w, l, d } = gamesSummary;
    const allGames = w + l + d;

    acc2 +=
      gamePoints / (allGames * 3) < 0.33 ? 0.33 : gamePoints / (allGames * 3);
  }
  const ogwp = acc2 / playerMatches.length;

  player.tiebreakers = {
    ...tiebreakers,
    mwp,
    omwp,
    gwp,
    ogwp,
    pgw: 0,
  };

  return player;
}
