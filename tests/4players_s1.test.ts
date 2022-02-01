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
    expect(tourney.players.length).toBe(4);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 1 });

    console.log('first round results setted');
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        results: match.result,
      });
    }
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings', () => {
    const standings = getStandings(tourney.players);
    console.log('round 1 standings:');
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
    expect(standings[0].nickname).toBe('user_2');
    expect(standings[1].nickname).toBe('user_0');
    expect(standings[2].nickname).toBe('user_3');
    expect(standings[3].nickname).toBe('user_1');
  });

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 3, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 1 });

    console.log('second round matches with results setted');
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        results: match.result,
      });
    }
  });

  it('should get final standings', () => {
    console.log('final standings');
    const standings = tournamentEnd(tourney);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
    expect(standings[0].nickname).toBe('user_2');
    expect(standings[1].nickname).toBe('user_1');
    expect(standings[2].nickname).toBe('user_0');
    expect(standings[3].nickname).toBe('user_3');
  });
});
