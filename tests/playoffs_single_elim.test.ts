import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import { Tournament } from '../src';
import console from 'console';
const jestConsole = console;

describe('tournament with single-elim playoffs', () => {
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
      playoffsFormat: 'single-elim',
      cutLimit: 8,
      bestOf: 3,
      winValue: 3,
      maxRounds: 4,
      drawValue: 1,
      lossValue: 0,
    };

    const players = <Player[]>[];
    const amount = 50;
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
    expect(tourney.players.length).toBe(50);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
    expect(tourney.currentRound).toBe(1);
  });

  it('should assign all results and the tournament should end in 4 rounds', () => {
    while (!tourney.inPlayoffs) {
      const activeMatches = tourney.matches.filter(
        (m) => m.round === tourney.currentRound
      );
      for (const activeMatch of activeMatches) {
        if (!activeMatch.active) continue;
        tourney = setResult(tourney, activeMatch.matchNumber, {
          p1: 2,
          p2: 0,
          d: 0,
        });
      }
      tourney = nextRound(tourney);
    }
    expect(tourney.currentRound).toBe(5);
  });

  it('should start a single eliminatino playoffs', () => {
    expect(tourney.inPlayoffs).toBe(true);
  });
});
