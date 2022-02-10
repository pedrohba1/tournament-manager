import { Tournament } from '../types/Tournament';
import getCurrentRoundMatch from '../utils/getCurrentRoundMatch';
import setMaxRound from './setMaxRound';

export default function undropPlayer(
  tourney: Tournament,
  playerId: string
): Tournament {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);

  if (tourney.players[playerIndex].roundOfDrop !== tourney.currentRound)
    throw Error(
      'cant undrop player if it was not dropped in the current round'
    );

  if (tourney.players[playerIndex].active === true)
    throw Error('player is already active');

  // in his current round match, mark him as active again, but do not
  // change results nor reset match as active. Let that for the evo

  const activeMatch = getCurrentRoundMatch(tourney, playerId);
  if (activeMatch.playerOne.id === playerId) {
    activeMatch.playerOne.active = true;
  }
  if (activeMatch.playerTwo.id === playerId) {
    activeMatch.playerTwo.active = true;
  }

  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === activeMatch.matchNumber
  );
  tourney.matches[matchIndex] = activeMatch;
  tourney.players[playerIndex].active = true;
  tourney.players[playerIndex].roundOfDrop = undefined;
  return tourney;
}
