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
    players.push(<Player>{
      id: '0',
      nickname: 'user_0',
      name: 'user_0',
    });

    players.push(<Player>{
      id: '1',
      nickname: 'user_1',
      name: 'user_1',
    });

    players.push(<Player>{
      id: '2',
      nickname: 'user_2',
      name: 'user_3',
    });

    players.push(<Player>{
      id: '3',
      nickname: 'user_3',
      name: 'user_3',
    });
    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(4);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 1 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings', () => {
    const standings = getStandings(tourney);

    expect(standings[0].nickname).toBe('user_0');
    expect(standings[1].nickname).toBe('user_2');
    expect(standings[2].nickname).toBe('user_3');
    expect(standings[3].nickname).toBe('user_1');
  });

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 3, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 0 });
  });

  it('should get final standings', () => {
    tournamentEnd(tourney);
  });
});
