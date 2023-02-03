import { Match } from '..';
import { Tournament } from '../types/Tournament';
import getCurrentRoundMatch from '../utils/getCurrentRoundMatch';

export default function unDropPlayer(
  tourney: Tournament,
  playerId: string
): [Tournament, Match] {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);

  if (tourney.players[playerIndex].roundOfDrop !== tourney.currentRound)
    throw Error(
      'cant undrop player if it was not dropped in the current round'
    );

  if (tourney.players[playerIndex].active === true)
    throw Error('player is already active');

  // in his current round match, mark him as active again, but do not
  // change results nor reset match as active. Let that for the evo

  const currentMatch = getCurrentRoundMatch(tourney, playerId);
  if (!currentMatch)
    throw new Error(`No match found with the given playerId: ${playerId}`);

  if (currentMatch.playerOne.id === playerId) {
    currentMatch.playerOne.active = true;
  }
  if (currentMatch.playerTwo.id === playerId) {
    currentMatch.playerTwo.active = true;
  }

  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === currentMatch.matchNumber
  );
  tourney.matches[matchIndex] = currentMatch;
  tourney.players[playerIndex].active = true;
  tourney.players[playerIndex].roundOfDrop = undefined;
  return [tourney, currentMatch];
}
