import { Tournament } from '../../types/Tournament';
import shuffle from '../shuffle';
import playersPairing from './playersPairing';

// seed null mean that players are alredy ordered by it's positions/seed
export default function createBracket(
  tourney: Tournament,
  seed?: number
): Tournament {
  const players = seed ? shuffle(tourney.players, seed) : tourney.players;
  tourney.matches = playersPairing(players, tourney);
  return tourney;
}
