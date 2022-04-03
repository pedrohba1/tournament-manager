import createTourney from '../src/Tournament/createTourney';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import { Tournament } from '../src';
import console from 'console';
const jestConsole = console;

describe('Filter function', () => {
  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  let tourney: Tournament;

  it('should configurate a tournament', () => {
    const options = <Options>{
      seed: 10,
      format: 'swiss',
      gameType: 'magic',
      playoffs: false,
      cutLimit: 8,
      maxRounds: null,
      bestOf: 3,
      winValue: 3,
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
    console.log(tourney.options);
    expect(tourney.options.maxRounds).toBe(2);
  });
});
