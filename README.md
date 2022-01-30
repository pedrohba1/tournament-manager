# Swiss Tournament Organizer for magic TGC

Under development. Do not trust this organzier 100% (yet).
Feel free to contribute. There are test files that can be run with `npm run test`.

## Getting Started

Simple usage:

```ts
import {
  Options,
  Player,
  Tournament,
  createTourney,
  startTourney,
  setResult,
  tournamentEnd,
  nextRound,
} from '.';

let tourney: Tournament;

const options = <Options>{
  seed: 10,
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
const amount = 4;
for (let i = 0; i < amount; i++) {
  const player = <Player>{
    id: `${i}`,
    nickname: `user_${i}`,
    name: `name_${i}`,
  };
  players.push(player);
}

tourney = createTourney(options, players);
tourney = startTourney(tourney);

tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });
tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 1 });

tourney = nextRound(tourney);

tourney = setResult(tourney, 3, { d: 0, p1: 0, p2: 2 });
tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 1 });

const standings = tournamentEnd(tourney);

// final standings
for (const standing of standings) {
  console.table({ ...standing.tiebreakers, nickname: standing.nickname });
}
```

