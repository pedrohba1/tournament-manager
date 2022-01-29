import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';
import shuffle from './shuffle';

export default function pairOpponentsFirstRound(
  tourney: Tournament,
  seed: number
): Tournament {
  // Shuffle players with seed
  const players = shuffle(tourney.players, seed);
  // create and assign matches
  const matches: Matches = [];
  for (let i = 0; i < players.length; i += 2) {
    const match = <Match>{
      playerOne: players[i],
      // last will contain bye. Assign bye to player.
      playerTwo: players[i + 1] ? players[i + 1] : { bye: true },
      active: true,
      matchNumber: tourney.lastMatchNumber,
      round: 1,
      result: null,
    };
    if (match.playerTwo.bye) {
      match.result = { d: 0, p1: 2, p2: 0 };
    }
    tourney.lastMatchNumber += 1;
    matches.push(match);
  }
  tourney.matches = matches;
  return tourney;
}
