import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';

export function setMatchPoints(
  tournament: Tournament,
  playerId: string,
  points: number
): Tournament {
  if (tournament.options.format !== 'remote')
    throw Error('tournament is not remote');
  const playerIndex = tournament.players.findIndex((p) => p.id === playerId);
  if (playerIndex === -1) throw Error('player not found');
  tournament.players[playerIndex].tiebreakers.matchPoints = points;

  return tournament;
}
