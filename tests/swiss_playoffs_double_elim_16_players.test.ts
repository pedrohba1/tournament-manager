import console from 'console';
import { Tournament } from '../src';
import createTourney from '../src/Tournament/createTourney';
import nextRound from '../src/Tournament/nextRound';
import setResult from '../src/Tournament/setResult';
import startTourney from '../src/Tournament/startTourney';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
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
      playoffs: true,
      cutLimit: 8,
      maxRounds: null,
      bestOf: 3,
      winValue: 3,
      maxRound: null,
      drawValue: 1,
      lossValue: 0,
      playoffsFormat: 'double-elim',
    };

    const players = <Player[]>[];
    const amount = 16;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `testest${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.ended).toBe(false);
    expect(tourney.players.length).toBe(16);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
    expect(tourney.matches).toHaveLength(8);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 3, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 5, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 6, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 7, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 1 });

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

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 9, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 10, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 11, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 12, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 13, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 14, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 15, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 16, { d: 0, p1: 2, p2: 1 });

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

  it('should set results for round 3', () => {
    tourney = setResult(tourney, 17, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 18, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 19, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 20, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 21, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 22, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 23, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 24, { d: 0, p1: 2, p2: 1 });

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

  it('should set results for round 4', () => {
    tourney = setResult(tourney, 25, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 26, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 27, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 28, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 29, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 30, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 31, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 32, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        results: match.result,
        round: match.round,
      });
    }
  });

  it('should not end tourney', () => {
    expect(() => {
      tournamentEnd(tourney);
    }).toThrowError('not in final round');
  });

  it('should start the playoffs', () => {
    tourney = nextRound(tourney);

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(4);
  });

  it('should go to playoffs round 2', () => {
    tourney = setResult(tourney, 33, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 34, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 35, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 36, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    expect(currentMatches).toHaveLength(4);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to playoffs round 3', () => {
    tourney = setResult(tourney, 37, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 38, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 39, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 40, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    const losersMatches = currentMatches.filter((m) => !m.winners);
    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(2);
    expect(losersMatches).toHaveLength(2);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to playoffs round 4', () => {
    tourney = setResult(tourney, 41, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 42, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    const losersMatches = currentMatches.filter((m) => !m.winners);
    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(0);
    expect(losersMatches).toHaveLength(2);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to playoffs round 5', () => {
    tourney = setResult(tourney, 43, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 44, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(1);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to playoffs round 6 (losers finals)', () => {
    tourney = setResult(tourney, 45, { d: 0, p1: 2, p2: 1 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    const losersMatches = currentMatches.filter((m) => !m.winners);
    expect(losersMatches).toHaveLength(1);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to playoffs round 7 (grand finals)', () => {
    tourney = setResult(tourney, 46, { d: 0, p1: 1, p2: 2 });

    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: match.playerOne.nickname,
        playerTwo: match.playerTwo.nickname,
        bracket: match.winners ? 'Winners Bracket' : 'Losers Bracket',
        results: match.result,
        round: match.round,
      });
    }

    const winners = currentMatches.filter((m) => m.winners);
    expect(winners).toHaveLength(1);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get final standings', () => {
    tourney = setResult(tourney, 47, { d: 0, p1: 0, p2: 2 });

    console.log('final standings');
    const standings = tournamentEnd(tourney);
    expect(tourney.ended).toBe(true);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });
});
