import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import { dropPlayer, Tournament } from '../src';
import console from 'console';
const jestConsole = console;

describe('25 players dropping 5', () => {
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
    const amount = 25;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(25);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 3, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 5, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 6, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 7, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 9, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 10, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 11, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 12, { d: 0, p1: 2, p2: 0 });
  });

  it('should drop 5 players before next round', () => {
    [tourney] = dropPlayer(tourney, '5');
    [tourney] = dropPlayer(tourney, '6');
    [tourney] = dropPlayer(tourney, '7');
    [tourney] = dropPlayer(tourney, '8');
    [tourney] = dropPlayer(tourney, '22');
    [tourney] = dropPlayer(tourney, '23');
    [tourney] = dropPlayer(tourney, '10');
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 14, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 15, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 16, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 17, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 18, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 19, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 20, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 21, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 22, { d: 0, p1: 2, p2: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should set results for round 3', () => {
    tourney = setResult(tourney, 23, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 24, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 25, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 26, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 27, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 28, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 29, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 30, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 31, { d: 0, p1: 2, p2: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should set results for round 4', () => {
    tourney = setResult(tourney, 32, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 33, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 34, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 35, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 36, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 37, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 38, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 39, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 40, { d: 0, p1: 2, p2: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should set results for round 5', () => {
    tourney = setResult(tourney, 41, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 42, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 43, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 44, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 45, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 46, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 47, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 48, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 49, { d: 0, p1: 2, p2: 0 });
  });

  it('should get final standings', () => {
    tournamentEnd(tourney);
  });
});
