import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import { Tournament } from '../src';
import getStandings from '../src/utils/getStandings';
import console from 'console';
const jestConsole = console;
import isPair from './utils/isPair';

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
    const amount = 8;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(8);
  });

  it('hould start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should assign results', () => {
    tourney = setResult(tourney, 1, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 2, { p1: 1, p2: 1, d: 1 });
    tourney = setResult(tourney, 3, { p1: 2, p2: 1, d: 0 });
    tourney = setResult(tourney, 4, { p1: 0, p2: 2, d: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get standings for round 1', () => {
    const standings = getStandings(tourney);

    expect(standings[0].nickname).toBe('user_7');
    expect(standings[1].nickname).toBe('user_0');
    expect(standings[2].nickname).toBe('user_4');
    expect(standings[3].nickname).toBe('user_3');
    expect(standings[4].nickname).toBe('user_2');
    expect(standings[5].nickname).toBe('user_5');
    expect(standings[6].nickname).toBe('user_6');
    expect(standings[7].nickname).toBe('user_1');
  });

  it('should get the correct pairings for round 2', () => {
    expect(isPair('0', '7', tourney)).toBe(true);
    expect(isPair('4', '3', tourney) || isPair('4', '2', tourney)).toBe(true);
    expect(isPair('2', '5', tourney) || isPair('3', '5', tourney)).toBe(true);
    expect(isPair('6', '1', tourney)).toBe(true);
  });

  it('should set results for round 2', () => {
    //user7 2x0 user5
    tourney = setResult(tourney, 5, { p1: 2, p2: 0, d: 0 });
    //user1 1x1 1draw user2
    tourney = setResult(tourney, 6, { p1: 2, p2: 0, d: 0 });
    //user3 2x1 user0
    tourney = setResult(tourney, 7, { p1: 2, p2: 0, d: 0 });
    //user6 0x2 user4
    tourney = setResult(tourney, 8, { p1: 0, p2: 2, d: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get standings for round 1', () => {
    getStandings(tourney);
  });
});
