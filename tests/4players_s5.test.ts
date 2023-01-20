import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import { Tournament } from '../src';
import getStandings from '../src/utils/getStandings';
import console from 'console';
const jestConsole = console;

describe('tournament with 4 rounds test', () => {
  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  let tourney: Tournament;

  it('should configurate a tournament', () => {
    const options = <Options>{
      format: 'swiss',
      seed: 839,
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
    const amount = 8;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `ID_${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(8);
  });

  it('should set results for round 1', () => {});

  it('should set results for round 2', () => {});

  it('should set results for round 3', () => {});

  it('should not have any round 4', () => {});
});
