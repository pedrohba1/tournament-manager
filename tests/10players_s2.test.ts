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
        id: `ID_${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }

    tourney = createTourney(options, players);
    expect(tourney.ended).toBe(false);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 2, { d: 0, p1: 1, p2: 2 });
    tourney = setResult(tourney, 3, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 5, { d: 0, p1: 2, p2: 0 });

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
  });

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 6, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 7, { d: 0, p1: 1, p2: 2 });
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 9, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 10, { d: 0, p1: 2, p2: 0 });

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

  it('should drop user 1 before round 3', () => {
    tourney = dropPlayer(tourney, 'ID_1');
  });

  it('should start next round 3', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings round 2', () => {
    console.log('round 2 standings');
    const standings = getStandings(tourney.players);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });

  it('should see pairings of round 3', () => {
    console.log('round 3 pairings');
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

  it('should assign results for round 3', () => {
    tourney = setResult(tourney, 12, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 13, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 14, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 15, { p1: 0, p2: 2, d: 0 });
  });

  it('shoudl start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings round 3', () => {
    console.log('round 3 final standings');
    const standings = getStandings(tourney.players);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });

  it('should see pairings of round 4', () => {
    console.log('round  pairings');
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

  it('should assign results for round 4', () => {
    tourney = setResult(tourney, 17, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 18, { p1: 0, p2: 2, d: 0 });
    tourney = setResult(tourney, 19, { p1: 2, p2: 0, d: 0 });
    tourney = setResult(tourney, 20, { p1: 0, p2: 2, d: 0 });
  });

  it('should end tournament', () => {
    const standings = tournamentEnd(tourney);
    console.log('logging final stnadings');
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });
});
