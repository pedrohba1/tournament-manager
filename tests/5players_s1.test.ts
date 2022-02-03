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
    const amount = 5;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(5);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 0 });

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

  it('should show matches of second round', () => {
    console.log('second round matches');
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

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 5, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 6, { d: 0, p1: 2, p2: 1 });

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

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should set reuslts for round 3', () => {
    tourney = setResult(tourney, 8, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 9, { d: 0, p1: 2, p2: 1 });
    console.log('third round matches with results setted');
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
    expect(standings[1].nickname).toBe('user_3');
    expect(standings[2].nickname).toBe('user_1');
    expect(standings[3].nickname).toBe('user_0');
    expect(standings[4].nickname).toBe('user_4');
  });
});

//user2 2 x 0  user5
// user1 2 x 1 user4
// user3 bye

//user 2 1st
//user 1 2nd
//bye 3rd
// 4th last
