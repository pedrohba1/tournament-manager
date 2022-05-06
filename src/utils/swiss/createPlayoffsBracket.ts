import { Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import getStandings from '../getStandings';
import playersPairing from '../single-elimination/playersPairing';

export default function createPlayoffsBracket(tourney: Tournament): Tournament {
  const classificados = getStandings(tourney.players).slice(
    0,
    tourney.options.cutLimit
  );

  const matches: Matches = [];
  playersPairing(matches, classificados, tourney);
  tourney.matches = tourney.matches.concat(matches);

  return tourney;
}
