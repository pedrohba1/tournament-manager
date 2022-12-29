import { Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import shuffle from '../shuffle';
import playersPairing from '../single-elimination/playersPairing';

// seed null mean that players are alredy ordered by it's positions/seed
export default function createBlankMatches(
  tourney: Tournament,
  seed?: number
): Tournament {
  const players = seed ? shuffle(tourney.players, seed) : tourney.players;
  const matches: Matches = [];
  playersPairing(matches, players, tourney);
  for (const match of matches) {
    match.result = { d: 0, p1: 0, p2: 0 };
  }

  tourney.matches = matches;

  // set some player pairings just to be sure that they all already have one
  for (let i = 0; i < tourney.players.length; i++) {
    tourney.players[i].tiebreakers.position = i;
  }

  return tourney;
}
