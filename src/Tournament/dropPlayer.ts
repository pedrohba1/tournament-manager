import { Match } from '../types/Match';
import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Result } from '../types/Results';
import { Tournament } from '../types/Tournament';

export default function dropPlayer(
  tourney: Tournament,
  playerId: string
): Tournament {
  const playerIndex = tourney.players.findIndex((p) => p.id === playerId);
  tourney.players[playerIndex].active = false;
  return tourney;
}
