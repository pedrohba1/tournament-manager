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
      cutLimit: 4,
      maxRounds: null,
      bestOf: 3,
      winValue: 3,
      maxRound: null,
      drawValue: 1,
      lossValue: 0,
      playoffsFormat: 'double-elim',
    };

    const players = <Player[]>[];
    const amount = 8;
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
    expect(tourney.players.length).toBe(8);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
    expect(tourney.matches).toHaveLength(4);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 3, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 1 });

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
    tourney = setResult(tourney, 5, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 6, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 7, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 1 });

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
    tourney = setResult(tourney, 9, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 10, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 11, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 12, { d: 0, p1: 2, p2: 1 });

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

    expect(currentMatches).toHaveLength(2);
  });

  it('should go to next round', () => {
    tourney = setResult(tourney, 17, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 18, { d: 0, p1: 2, p2: 1 });

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
      });
    }

    expect(currentMatches).toHaveLength(2);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to next round', () => {
    tourney = setResult(tourney, 19, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 20, { d: 0, p1: 2, p2: 1 });

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
      });
    }

    const losersMatches = currentMatches.filter((m) => !m.winners);
    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(1);
    expect(losersMatches).toHaveLength(1);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to next round', () => {
    tourney = setResult(tourney, 21, { d: 0, p1: 2, p2: 1 });

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
      });
    }

    const losersMatches = currentMatches.filter((m) => !m.winners);
    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(0);
    expect(losersMatches).toHaveLength(1);
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should go to grand finals', () => {
    tourney = setResult(tourney, 22, { d: 0, p1: 2, p2: 1 });

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
      });
    }

    const winnersMatches = currentMatches.filter((m) => m.winners);
    expect(winnersMatches).toHaveLength(1);
  });

  it('should get final standings', () => {
    console.log('final standings');
    const standings = tournamentEnd(tourney);
    expect(tourney.ended).toBe(true);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });
});
