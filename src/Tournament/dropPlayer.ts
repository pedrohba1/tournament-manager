import { Tournament } from '../types/Tournament';
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
  return tourney;
}
