import { Tournament } from '../src';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import console from 'console';
const jestConsole = console;

describe('Double Elimination Tournament Test', () => {
  let tourney: Tournament;

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('should create tournament', (done) => {
    const options = {
      format: 'double-elim',
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
    } as Options;

    const players: Player[] = [];
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
    expect(tourney.options.format).toBe('double-elim');

    done();
  });

  it('should start tourney without seed and assign matches', (done) => {
    tourney = startTourney(tourney);
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(4);
    expect(currentMatches[1].result).toBeNull();
    expect(tourney.currentRound).toBe(1);
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    tourney = setResult(tourney, 2, { d: 0, p1: 1, p2: 2 });

    tourney = nextRound(tourney);

    expect(tourney.currentRound).toBe(2);
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    tourney = setResult(tourney, 5, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 6, { d: 0, p1: 0, p2: 2 });

    tourney = nextRound(tourney);
    expect(tourney.currentRound).toBe(3);
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 9, { d: 0, p1: 2, p2: 0 });

    tourney = nextRound(tourney);
    expect(tourney.currentRound).toBe(4);
    done();
  });

  it('should not end tourney', (done) => {
    expect(() => {
      tournamentEnd(tourney);
    }).toThrow('not in final round');
    done();
  });

  it('should assing matches result and go to next round', (done) => {
    // Match number 11 é um contra bye true
    tourney = setResult(tourney, 12, { d: 0, p1: 0, p2: 2 });

    tourney = nextRound(tourney);
    expect(tourney.currentRound).toBe(5);
    done();
  });

  it('should assing grand finals and not go to next round', (done) => {
    tourney = setResult(tourney, 13, { d: 0, p1: 0, p2: 2 });

    nextRound(tourney);

    done();
  });

  it('should end tourney', (done) => {
    tournamentEnd(tourney);

    expect(tourney.ended).toBe(true);
    done();
  });
});
