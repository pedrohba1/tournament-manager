import { Match } from '..';
import { Tournament } from '../types/Tournament';
import getCurrentRoundMatch from '../utils/getCurrentRoundMatch';

export default function dropPlayer(
  tourney: Tournament,
  playerId: string
): [Tournament, Match] {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);
  if (tourney.players[playerIndex].active === false)
    throw Error('player already dropped');
  tourney.players[playerIndex].active = false;
  tourney.players[playerIndex].roundOfDrop = tourney.currentRound;

  // assign this player active match an {active: false};
  const currentMatch = getCurrentRoundMatch(tourney, playerId);
  if (currentMatch.playerOne.id === playerId) {
    currentMatch.playerOne.active = false;
  }
  if (currentMatch.playerTwo.id === playerId) {
    currentMatch.playerTwo.active = false;
  }

  // if there isn't a result set, it should give his opponent 2x0,
  if (!currentMatch.result) {
    // gives his opponent, if not bye, 2x0
    if (currentMatch.playerOne.id === playerId) {
      currentMatch.result = {
        d: 0,
        p1: 0,
        p2: 2,
      };
    }
    if (currentMatch.playerTwo.id === playerId) {
      currentMatch.result = {
        d: 0,
        p1: 2,
        p2: 0,
      };
    }
  }

  // set match changes:
  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === currentMatch.matchNumber
  );

  // match should be marked as active: false too
  currentMatch.active = false;

  tourney.matches[matchIndex] = currentMatch;
  return [tourney, currentMatch];
}
