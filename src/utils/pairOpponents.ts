import { Player } from '..';
import { Match } from '../types/Match';
import { Tournament } from '../types/Tournament';
import getPossiblePairings from './getPossiblePairings';
import getStandings from './getStandings';
import choosePossibility from './choosePossibilty';
import { debug } from './debug';

export default function pairOpponents(tourney: Tournament): Tournament {
  // then orders players in descending order (first is best last is worst)
  // this also filters only active players
  let orderedByGreatness = getStandings(tourney);
  orderedByGreatness = orderedByGreatness.filter((p) => p.active === true);

  // already assign bye to worst player that received less byes, and amount of possible players
  // is odd
  const paired = <Match[]>[];
  if (orderedByGreatness.length % 2 !== 0) {
    const worsts = orderedByGreatness
      .splice(
        Math.ceil(orderedByGreatness.length / 2),
        orderedByGreatness.length
      )
      .reverse();
    let chosen = worsts[0];
    for (const worst of worsts) {
      if (worst.tiebreakers.byes < chosen.tiebreakers.byes) {
        chosen = worst;
      }
    }
    tourney.matches.push(<Match>{
      active: false,
      playerOne: chosen,
      playerTwo: <Player>{ bye: true },
      matchNumber: tourney.lastMatchNumber,
      round: tourney.currentRound,
      etc: {},
      result: {
        d: 0,
        p1: 2,
        p2: 0,
      },
    });
    tourney.lastMatchNumber += 1;
  }
  //pair the players (bests against bests and worst against worsts)
  // pairing needs to respect forbidden pairings rules.
  const possiblePairings = getPossiblePairings(tourney);

  debug('possible pairings');
  debug(possiblePairings);
  const pairings = choosePossibility(possiblePairings);

  debug('chosen pairings');
  debug(pairings);
  const added = new Set();
  pairings.forEach((item, index) => {
    if (item === -1) return;
    if (added.has(item) && added.has(index)) return;
    const player1 = tourney.players.find((p) => Number(p.blossomId) === index);
    let player2 = tourney.players.find((p) => Number(p.blossomId) === item);
    if (!player1?.active || player2?.active === false) return;
    player2 = player2 ? player2 : <Player>{ bye: true };
    if (!player2.bye) {
      added.add(Number(player2.blossomId));
      added.add(index);
    }
    paired.push(<Match>{
      active: true,
      playerOne: player1,
      playerTwo: player2,
      matchNumber: tourney.lastMatchNumber,
      round: tourney.currentRound,
      etc: {},
    });
    tourney.lastMatchNumber += 1;
  });

  tourney.matches = [...tourney.matches, ...paired];
  return tourney;
}
