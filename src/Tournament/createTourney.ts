import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';

export default function createTourney(
  options: Options,
  players: Player[]
): Tournament {
  const tourney = <Tournament>{};
  tourney.options = options;
  tourney.players = players;
  return tourney;
}
