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

    players.push(<Player>{
      id: '5',
      nickname: 'user_5',
      name: 'user_5',
    });

    players.push(<Player>{
      id: '4',
      nickname: 'user_4',
      name: 'user_4',
    });

    players.push(<Player>{
      id: '3',
      nickname: 'user_3',
      name: 'user_3',
    });

    players.push(<Player>{
      id: '2',
      nickname: 'user_2',
      name: 'user_2',
    });

    players.push(<Player>{
      id: '1',
      nickname: 'user_1',
      name: 'user_1',
    });

    players.push(<Player>{
      id: '0',
      nickname: 'user_0',
      name: 'user_0',
    });

    players.push(<Player>{
      id: '6',
      nickname: 'user_6',
      name: 'user_6',
    });

    players.push(<Player>{
      id: '7',
      nickname: 'user_7',
      name: 'user_7',
    });

    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(8);
  });

  it('hould start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should assign results', () => {
    //user5 2x0 user4
    tourney = setResult(tourney, 1, { p1: 2, p2: 0, d: 0 });
    //user3 1x1 1draw user2
    tourney = setResult(tourney, 2, { p1: 1, p2: 1, d: 1 });
    //user1 2x1 user0
    tourney = setResult(tourney, 3, { p1: 2, p2: 1, d: 0 });
    //user6 0x2 user7
    tourney = setResult(tourney, 4, { p1: 0, p2: 2, d: 0 });
    console.log(tourney.matches);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get standings for round 1', () => {
    const standings = getStandings(tourney.players);
    console.log('round 1 standings:');
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
    expect(standings[0].nickname).toBe('user_7');
    expect(standings[1].nickname).toBe('user_5');
    expect(standings[2].nickname).toBe('user_1');
    expect(standings[3].nickname).toBe('user_2');
    expect(standings[4].nickname).toBe('user_3');
    expect(standings[5].nickname).toBe('user_0');
    expect(standings[6].nickname).toBe('user_6');
    expect(standings[7].nickname).toBe('user_4');
  });
});
