import createTourney from './Tournament/createTourney';
import startTourney from './Tournament/startTourney';
import setResult from './Tournament/setResult';
import { Options } from './types/Options';
import { Player } from './types/Player';
import nextRound from './Tournament/nextRound';
import calculateTiebreakers from './utils/calculateTiebreakers';

const options = <Options>{
  seed: 123120938,
  format: 'swiss',
  gameType: 'magic',
  playoffs: false,
  cutLimit: 8,
  maxRounds: null,
  bestOf: 3,
  winValue: 3,
  maxRound: null,
  drawValue: 1,
  lossValue: 0,
};

const players = <Player[]>[];
const amount = 5;
for (let i = 0; i < amount; i++) {
  const player = <Player>{
    id: `${i}`,
    nickname: `user_${i}`,
    name: `name_${i}`,
  };
  players.push(player);
}

let tourney = createTourney(options, players);
tourney = startTourney(tourney);
console.log(tourney.matches);

tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 0 });
tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 0 });

tourney = nextRound(tourney);
console.log(tourney.options.maxRounds);

for (const player of tourney.players) {
}
