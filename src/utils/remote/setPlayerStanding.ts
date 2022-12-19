import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';

export default function setPlayerStanding(
  tournament: Tournament,
  playerId: string,
  position: number
): void {
  const playerIndex = tournament.players.findIndex((p) => p.id === playerId);
  if (position <= 0 || position > tournament.players.length)
    throw Error('position must be a number between 1 and the total of players');
  if (playerIndex === -1) throw Error('player not found');

  // if another player has this same position, sets it to undefined.
  // two players cant be in the same position
  const playerPositionedIndex = tournament.players.findIndex(
    (p) => p.tiebreakers.position === position
  );

  if (playerPositionedIndex !== -1)
    tournament.players[playerPositionedIndex].tiebreakers.position = undefined;
  tournament.players[playerIndex].tiebreakers.position = position;
}
