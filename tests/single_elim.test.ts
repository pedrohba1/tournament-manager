import { Tournament } from '../src';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import console from 'console';
import getStandings from '../src/utils/getStandings';
const jestConsole = console;

describe('Single Elimination Tournament Test', () => {
  let tourney: Tournament;

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('should create tournament', (done) => {
    const options = <Options>{
      seed: 10,
      format: 'single-elim',
      gameType: 'magic',
      playoffs: false,
      cutLimit: 8,
      maxRounds: null,
      bestOf: 3,
      winValue: 3,
      maxRound: null,
      drawValue: 1,
      lossValue: 0,
      playoffsFormat: '',
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
    expect(tourney.ended).toBe(false);
    expect(tourney.players.length).toBe(amount);
    expect(tourney.options.format).toBe('single-elim');
    done();
  });

  it('should start tourney without seed and assign matches', (done) => {
    tourney = startTourney(tourney);
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(4);

    const standings = getStandings(tourney);

    expect(currentMatches[1].result).toBeNull();
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    tourney = setResult(tourney, 2, { d: 0, p1: 1, p2: 2 });
    tourney = nextRound(tourney);
    expect(tourney.currentRound).toBe(2);
    done();
  });

  it('should calculate right the next matches', (done) => {
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(2);
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    tourney = setResult(tourney, 5, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 6, { d: 0, p1: 0, p2: 2 });
    tourney = nextRound(tourney);
    expect(tourney.currentRound).toBe(3);
    done();
  });

  it('should calculate right the next matches', (done) => {
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(2);
    done();
  });

  it('should assing matches result and not go to next round', (done) => {
    tourney = setResult(tourney, 7, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 0 });
    expect(() => {
      nextRound(tourney);
    }).toThrow('tourney ended already');
    done();
  });

  it('should end tourney', (done) => {
    const standings = tournamentEnd(tourney);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }

    const firstRoundMatches = tourney.matches.filter((m) => m.round === 1);
    expect(firstRoundMatches).toHaveLength(4);

    expect(tourney.ended).toBe(true);
    expect(standings[0].id).toBe('2');
    expect(standings[1].id).toBe('4');
    expect(standings[2].id).toBe('3');
    expect(standings[0].tiebreakers.matchesSummary.l).toBe(0);
    expect(standings[1].tiebreakers.matchesSummary.l).toBe(1);
    done();
  });
});
