import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';
import shuffle from './shuffle';

export default function pairOpponentsFirstRound(
  tourney: Tournament,
  seed?: number
): Tournament {
  // Shuffle players with seed
  const players = seed ? shuffle(tourney.players, seed) : tourney.players;
  // create and assign matches
  const matches: Matches = [];
  for (let i = 0; i < players.length; i += 2) {
    const match = {
      playerOne: players[i],
      // last will contain bye. Assign bye to player.
      playerTwo: players[i + 1] ? players[i + 1] : { bye: true },
      active: true,
      matchNumber: tourney.lastMatchNumber,
      round: 1,
      result: null,
    } as Match;
    if (match.playerTwo.bye) {
      match.result = { d: 0, p1: 2, p2: 0 };
      match.active = false;
      const playerByIndex = tourney.players.findIndex(
        (p) => p.id === players[i].id
      );
      tourney.players[playerByIndex].tiebreakers.byes += 1;
    }
    tourney.lastMatchNumber += 1;
    matches.push(match);
  }
  tourney.matches = matches;
  return tourney;
}
