import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';

export default function setPlayerStanding(
  tournament: Tournament,
  playerId: string,
  position: number
): Tournament {
  const playerIndex = tournament.players.findIndex((p) => p.id === playerId);
  if (position <= 0 || position > tournament.players.length - 1)
    throw Error(
      'position must be a number between 0 and the total of players -1'
    );
  if (playerIndex === -1) throw Error('player not found');

  // if another player has this same position, sets it to
  // previous player position.
  // Because two players cant be in the same position
  const playerPositionedIndex = tournament.players.findIndex(
    (p) => p.tiebreakers.position === position
  );

  const previousPlayerPosition =
    tournament.players[playerIndex].tiebreakers.position;
  if (playerPositionedIndex !== -1)
    tournament.players[
      playerPositionedIndex
    ].tiebreakers.position = previousPlayerPosition;
  tournament.players[playerIndex].tiebreakers.position = position;

  return tournament;
}
