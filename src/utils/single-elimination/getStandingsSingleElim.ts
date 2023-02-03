import { Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import getBracketStandings from '../getBracketStandings';

export default function getStandingsSingleElim(
  matches: Matches,
  players: Player[]
): Player[] {
  const partialStandings: string[] = [];
  const totalMatches = 2 ** Math.ceil(Math.log2(players.length));

  if (matches.length >= totalMatches - 1) {
    const final = matches[matches.length - 1];
    const decider = matches[matches.length - 2];

    if (!final.result || !decider.result)
      throw new Error('Final or Decider result are null');

    if (final.result.p1 > final.result.p2) {
      partialStandings.push(final.playerOne.id);
      partialStandings.push(final.playerTwo.id);
    } else {
      partialStandings.push(final.playerTwo.id);
      partialStandings.push(final.playerOne.id);
    }

    if (decider.result.p1 > decider.result.p2) {
      partialStandings.push(decider.playerOne.id);
      partialStandings.push(decider.playerTwo.id);
    } else {
      partialStandings.push(decider.playerTwo.id);
      partialStandings.push(decider.playerOne.id);
    }
  }

  const standings = partialStandings.concat(
    getBracketStandings(
      matches.slice(
        0,
        matches.length < totalMatches ? matches.length : totalMatches - 4
      )
    )
  );
  const sortedPlayers = players;

  sortedPlayers.sort(
    (a, b) => standings.indexOf(a.id) - standings.indexOf(b.id)
  );

  return sortedPlayers;
}
