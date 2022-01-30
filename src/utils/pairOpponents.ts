import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';
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

  for (let i = 0; i < bests.length; i += 2) {
    const match = <Match>{
      active: true,
      matchNumber: tourney.lastMatchNumber,
      playerOne: bests[i],
      playerTwo: bests[i + 1],
      round: tourney.currentRound,
    };
    tourney.lastMatchNumber += 1;
    tourney.matches.push(match);
  }

  // from the worsts, the one with less byes should receive a bye
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
    worsts = worsts.filter((item) => item.id != playerLessBye.id);
  }

  for (let i = 0; i < worsts.length; i += 2) {
    const match = <Match>{
      active: true,
      matchNumber: tourney.lastMatchNumber,
      playerOne: worsts[i],
      playerTwo: worsts[i + 1],
      round: tourney.currentRound,
    };
    tourney.lastMatchNumber += 1;
    tourney.matches.push(match);
  }

  return tourney;
}
