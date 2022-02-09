import { Tournament } from '../types/Tournament';
import setMaxRound from './setMaxRound';

export default function undropPlayer(
  tourney: Tournament,
  playerId: string
): Tournament {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);

  if (tourney.players[playerIndex].roundOfDrop === tourney.currentRound)
    throw Error(
      'cant undrop player if it was not dropped in the current round'
    );

  if (tourney.players[playerIndex].active === true)
    throw Error('player is already active');

  tourney.players[playerIndex].active = true;
  tourney.players[playerIndex].roundOfDrop = undefined;
  return tourney;
}
