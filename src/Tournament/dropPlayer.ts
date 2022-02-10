import { Tournament } from '../types/Tournament';
import getCurrentRoundMatch from '../utils/getCurrentRoundMatch';
import setMaxRound from './setMaxRound';

export default function dropPlayer(
  tourney: Tournament,
  playerId: string
): Tournament {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);
  if (tourney.players[playerIndex].active === false)
    throw Error('player already dropped');
  tourney.players[playerIndex].active = false;
  tourney.players[playerIndex].roundOfDrop = tourney.currentRound;

  // assign this player active match an {active: false};
  const activeMatch = getCurrentRoundMatch(tourney, playerId);
  if (activeMatch.playerOne.id === playerId) {
    activeMatch.playerOne.active = false;
  }
  if (activeMatch.playerTwo.id === playerId) {
    activeMatch.playerTwo.active = false;
  }

  // if there isn't a result set, it should give his opponent 2x0,
  if (!activeMatch.result) {
    // gives his opponent, if not bye, 2x0
    if (activeMatch.playerOne.id === playerId) {
      activeMatch.result = {
        d: 0,
        p1: 0,
        p2: 2,
      };
    }
    if (activeMatch.playerTwo.id === playerId) {
      activeMatch.result = {
        d: 0,
        p1: 2,
        p2: 0,
      };
    }
  }

  // set match changes:
  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === activeMatch.matchNumber
  );

  // match should be marked as active: false too
  activeMatch.active = false;

  tourney.matches[matchIndex] = activeMatch;
  return tourney;
}
