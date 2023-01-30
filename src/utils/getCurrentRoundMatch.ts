import { Tournament } from '../types/Tournament';
import { Match } from '../types/Match';

export default function getCurrentRoundMatch(
  tourney: Tournament,
  playerId: string
): Match | undefined {
  return tourney.matches.find(
    (m) =>
      (m.playerOne.id === playerId || m.playerTwo.id === playerId) &&
      m.round === tourney.currentRound
  );
}
