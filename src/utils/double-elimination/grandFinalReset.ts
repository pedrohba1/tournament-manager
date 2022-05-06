import { Match } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import createNewMatch from '../createNewMatch';
import setPlayersPoints from '../../utils/setPlayerPoints';
import calculateTiebreakers from '../../utils/calculateTiebreakers';

export default function grandFinalReset(tourney: Tournament): Tournament {
  const lastMatch: Match[] = tourney.matches.filter(
    (match) => match.round === tourney.options.maxRounds - 1
  );

  if (lastMatch[0].result.p2 > lastMatch[0].result.p1) {
    tourney.currentRound += 1;
    tourney = setPlayersPoints(tourney);

    tourney.matches.push(
      createNewMatch(
        lastMatch[0].playerOne,
        lastMatch[0].playerTwo,
        tourney,
        false
      )
    );

    for (const player of tourney.players) {
      const playerIndex = tourney.players.findIndex((p) => p.id === player.id);
      tourney.players[playerIndex] = calculateTiebreakers(player, tourney);
    }
  } else {
    throw Error('tourney ended already');
  }

  return tourney;
}
