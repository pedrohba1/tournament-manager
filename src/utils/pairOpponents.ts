import { nextRound, Player } from '..';
import { Match, Matches } from '../types/Match';
import { Tournament } from '../types/Tournament';
import getForbiddenPairings from './getForbbidenPairings';
import getPossiblePairings from './getPossiblePairings';
import getStandings from './getStandings';
import choosePossibility from './choosePossibilty';
const DEBUG = false;

function debug(...args) {
  if (DEBUG) {
    console.log.apply(this, args);
  }
}

export default function pairOpponents(tourney: Tournament): Tournament {
  const pairingPlayers = tourney.players;

  // first, removes from the array the players that have been dropped:

  // then orders players in descending order (first is best last is worst)
  let orderedByGreatness = getStandings(pairingPlayers);
  orderedByGreatness = orderedByGreatness.filter((p) => p.active === true);

  //pair the players (bests against bests and worst against worsts)
  // pairing needs to respect forbidden pairings rules.

  const possiblePairings = getPossiblePairings(tourney);
  // if (tourney.currentRound === 3) {
  //   console.log('ordenado por greatness');
  //   readableStandings(orderedByGreatness);
  // }
  const pairings = choosePossibility(possiblePairings);
  const paired = <Match[]>[];
  const added = new Set();
  pairings.forEach((item, index) => {
    if (added.has(item) && added.has(index)) return;
    let player2 = tourney.players.find((p) => Number(p.id) === item);
    player2 = player2 ? player2 : <Player>{ bye: true };
    if (!player2.bye) {
      added.add(Number(player2.id));
      added.add(index);
    }
    paired.push(<Match>{
      active: true,
      playerOne: tourney.players.find((p) => Number(p.id) === index),
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
