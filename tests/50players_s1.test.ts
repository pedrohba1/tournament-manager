import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import { Tournament } from '../src';
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
      hasPlayoffs: false,
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
  });

  it('should get maxRounds in 4', () => {
    expect(tourney.options.maxRounds).toBe(4);
  });

  it('should assign all results and the tournament should end in 4 rounds', () => {
    while (!tourney.ended) {
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
      if (tourney.currentRound === tourney.options.maxRounds) break;
      tourney = nextRound(tourney);
    }
    expect(tourney.currentRound).toBe(4);
  });
});
