import { Tournament } from '../types/Tournament';

export default function setPlayersPoints(tourney: Tournament): Tournament {
  for (const player of tourney.players) {
    const matchesOfPlayer = tourney.matches.filter(
      (m) => m.playerOne.id === player.id || m.playerTwo.id === player.id
    );

    let [mWin, mLose, mDraw] = [0, 0, 0];
    let [gWin, gLose, gDraw] = [0, 0, 0];

    let gamePoints = 0;
    let matchPoints = 0;
    let byes = 0;
    const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
    for (const match of matchesOfPlayer) {
      const currentMatchResult = match.result;

      if (currentMatchResult) {
        const { d, p1, p2 } = currentMatchResult;
        if (player.id === match.playerOne.id) {
          gamePoints += p1 * 3 + d * 1;
          gWin += p1;
          gLose += p2;
          gDraw += d;
          if (match.playerTwo.bye) {
            byes += 1;
          }
          if (p1 > p2) {
            matchPoints += 3;
            mWin += 1;
          } else if (p1 < p2) {
            mLose += 1;
            matchPoints += 0;
          } else if (p1 == p2) {
            mDraw += 1;
            matchPoints += 1;
          } else if (p1 == p2 && d === 1) {
            matchPoints += 1;
            mDraw += 1;
          }
        }
        if (player.id === match.playerTwo.id) {
          gamePoints += p2 * 3 + d * 1;

          gWin += p2;
          gLose += p1;
          gDraw += d;
          if (match.playerOne.bye) {
            byes += 1;
          }
          if (p2 > p1) {
            matchPoints += 3;
            mWin += 1;
          } else if (p2 < p1) {
            matchPoints += 0;
            mLose += 1;
          } else if (p1 == p2) {
            matchPoints += 1;
            mDraw += 1;
          } else if (p1 == p2 && d === 1) {
            matchPoints += 1;
            mDraw += 1;
          }
        }
      }
    }

    tourney.players[playerIndex] = {
      ...player,
      tiebreakers: {
        ...player.tiebreakers,
        byes,
        matchesSummary: {
          w: mWin,
          l: mLose,
          d: mDraw,
        },
        gamesSummary: {
          w: gWin,
          l: gLose,
          d: gDraw,
        },
        gamePoints,
        matchPoints,
      },
    };
  }

  return tourney;
}
