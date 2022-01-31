import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';
import getForbiddenPairings from './getForbbidenPairings';
import getStandings from './getStandings';
export default function pairOpponents(tourney: Tournament): Tournament {
  let pairingPlayers = tourney.players;

  // first, removes from the array the players that have been dropped:
  pairingPlayers = pairingPlayers.filter((p) => p.active === true);

  // then orders players in descending order (first is best last is worst)
  pairingPlayers = getStandings(pairingPlayers);

  // from pairingPlayers, create new matches were the best are paired with the best and the worst with the worst
  const bests = pairingPlayers.slice(0, Math.floor(pairingPlayers.length / 2));
  let worsts = pairingPlayers.slice(
    Math.floor(pairingPlayers.length / 2),
    pairingPlayers.length
  );

  // from the worsts, the one with less byes should receive a bye, if
  // the amount of worst players is odd
  // find byes of each of the worsts
  if (worsts.length % 2 !== 0) {
    const worstMapByes = worsts
      .map((player, index) => {
        const byes = tourney.matches.reduce((acc, m) => {
          if (m.playerOne.id === player.id || m.playerTwo.id === player.id) {
            if (m.playerOne.bye === true) return (acc += 1);
            if (m.playerTwo.bye === true) return (acc += 1);
          }
          return (acc += 0);
        }, 0);
        return { id: player.id, byes };
      })
      .sort((a, b) => (a.byes > b.byes ? 1 : -1));

    const playerLessBye = tourney.players.find(
      (p) => p.id === worstMapByes[0].id
    );
    const byeMatch = <Match>{
      active: false,
      playerOne: playerLessBye,
      playerTwo: { bye: true },
      matchNumber: tourney.lastMatchNumber,
      result: { p1: 2, p2: 0, d: 0 },
      round: tourney.currentRound,
      etc: {},
    };
    tourney.lastMatchNumber += 1;
    tourney.matches.push(byeMatch);
    //remove the worst player that received a bye from the worsts group
    worsts = worsts.filter((item) => item.id != playerLessBye.id);
  }

  const orderedByGreatness = [...bests, ...worsts];

  //pair the players (bests against bests and worst against worsts)
  // pairing needs to respect forbidden pairings rules.

  for (const player of orderedByGreatness) {
    const forbiddenPairings = getForbiddenPairings(player, tourney);
    if (
      tourney.matches.find(
        (m) =>
          m.round === tourney.currentRound &&
          (m.playerOne.id === player.id || m.playerTwo.id === player.id)
      )
    )
      continue;
    for (const opponent of orderedByGreatness) {
      // do not allow a pairing if forbidden
      if (forbiddenPairings.has(opponent.id)) continue;
      // do not allow pairing if either opponent or player already were paired
      // in this round
      if (
        tourney.matches.find(
          (m) =>
            (m.round === tourney.currentRound &&
              m.playerOne.id === opponent.id) ||
            m.playerTwo.id === opponent.id
        )
      )
        continue;
      else {
        const match = <Match>{
          active: true,
          matchNumber: tourney.lastMatchNumber,
          playerOne: player,
          playerTwo: opponent,
          round: tourney.currentRound,
        };
        tourney.lastMatchNumber += 1;
        tourney.matches.push(match);
        break;
      }
    }
  }

  return tourney;
}
