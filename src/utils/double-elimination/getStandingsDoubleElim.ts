import { Match, Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import getBracketStandings from '../getBracketStandings';

export default function getStandingsDoubleElim(
  matches: Matches,
  players: Player[]
): Player[] {
  const eliminationMatches: Matches = [];
  const grandFinal: Match = matches[matches.length - 1];

  for (const match of matches) {
    if (!match.winners) {
      eliminationMatches.push(match);
    }
  }

  eliminationMatches.push(grandFinal);
  const standings = getBracketStandings(eliminationMatches);
  const sortedPlayers = players;

  sortedPlayers.sort(
    (a, b) => standings.indexOf(a.id) - standings.indexOf(b.id)
  );

  return sortedPlayers;
}
