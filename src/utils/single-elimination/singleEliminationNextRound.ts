import { Tournament } from '../../types/Tournament';
import { Matches } from '../../types/Match';
import { Player } from '../../types/Player';
import createNewMatch from '../createNewMatch';

export default function singleEliminationNextRound(
  tourney: Tournament
): Tournament {
  const lastMaches: Matches = tourney.matches.filter(
    (m) => m.round === tourney.currentRound - 1
  );
  const matches: Matches = [];

  if (tourney.currentRound == tourney.options.maxRounds) {
    const final: Player[] = [];
    const decider: Player[] = [];

    for (const match of lastMaches) {
      if (match.result.p1 > match.result.p2) {
        final.push(match.playerOne);
        decider.push(match.playerTwo);
      } else {
        final.push(match.playerTwo);
        decider.push(match.playerOne);
      }
    }

    matches.push(createNewMatch(decider[0], decider[1], tourney));
    matches.push(createNewMatch(final[0], final[1], tourney));
  } else {
    const players: Player[] = [];

    for (const match of lastMaches) {
      if (match.result.p1 > match.result.p2) {
        players.push(match.playerOne);
      } else {
        players.push(match.playerTwo);
      }
    }

    const totalSlots = 2 ** Math.ceil(Math.log2(players.length));
    for (let i = 0; i < totalSlots; i += 2) {
      matches.push(createNewMatch(players[i], players[i + 1], tourney));
    }
  }

  tourney.matches = tourney.matches.concat(matches);
  return tourney;
}
