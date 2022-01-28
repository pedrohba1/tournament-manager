import createTourney from './Tournament/createTourney';
import startTourney from './Tournament/startTourney';
import setResult from './Tournament/setResult';
import { Options } from './types/Options';
import { Player } from './types/Player';
import nextRound from './Tournament/nextRound';
import calculateTiebreakers from './utils/calculateTiebreakers';

const options = <Options>{
  format: 'swiss',
  gameType: 'magic',
  playoffs: false,
  cutLimit: 8,
  bestOf: 3,
  winValue: 3,
  maxRound: null,
  drawValue: 1,
  lossValue: 0,
};

const players = <Player[]>[
  {
    id: '0',
    name: 'user_0',
    nickname: 'user_0',
  },
  {
    id: '1',
    name: 'user_1',
    nickname: 'user_1',
  },
  {
    id: '2',
    name: 'user_2',
    nickname: 'user_2',
  },
  {
    id: '3',
    name: 'user_3',
    nickname: 'user_3',
  },
  {
    id: '4',
    name: 'user_4',
    nickname: 'user_4',
  },
  {
    id: '5',
    name: 'user_5',
    nickname: 'user_5',
  },
];

let tourney = createTourney(options, players);
tourney = startTourney(tourney, 1233451);

// for (const match of tourney.matches) {
//   console.log(match);
// }

tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 0 });
tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 0 });
tourney = setResult(tourney, 3, { d: 0, p1: 2, p2: 0 });

tourney = nextRound(tourney);
console.log(tourney.players);
