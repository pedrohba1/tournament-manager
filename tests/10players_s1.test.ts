import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import { dropPlayer, Tournament } from '../src';
import getStandings from '../src/utils/getStandings';
import console from 'console';
const jestConsole = console;
import isPair from './utils/isPair';
import readableStandings from '../src/utils/readableStandings';

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
    const amount = 10;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }
    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(10);
  });

  it('hould start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should assign results', () => {
    tourney = setResult(tourney, 1, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 2, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 3, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 4, { p1: 1, p2: 2, d: 0 });
    tourney = setResult(tourney, 5, { p1: 1, p2: 2, d: 0 });
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get next matches pairings', () => {
    const activeMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of activeMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        results: match.result,
      });
    }
  });

  it('should assign results for round2', () => {
    tourney = setResult(tourney, 6, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 7, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 8, { p1: 2, p2: 1, d: 0 });
    tourney = setResult(tourney, 9, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 10, { p1: 2, p2: 0, d: 0 });
  });

  it('should drop player5 ', () => {
    tourney = dropPlayer(tourney, '5');
  });

  it('get standings before rund 3 ', () => {
    console.log('before round 3 standings');
    const standings = getStandings(tourney.players);
    readableStandings(standings);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get next matches pairings', () => {
    const activeMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of activeMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        results: match.result,
      });
    }
  });
});
