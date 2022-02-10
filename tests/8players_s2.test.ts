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
    const amount = 8;
    for (let i = 0; i < amount; i++) {
      const player = <Player>{
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      };
      players.push(player);
    }
    tourney = createTourney(options, players);
    expect(tourney.players.length).toBe(8);
  });

  it('hould start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should assign results', () => {
    //user0 0x2 user1
    tourney = setResult(tourney, 1, { p1: 0, p2: 2, d: 0 });
    //user2 2x0 1draw user3
    tourney = setResult(tourney, 2, { p1: 2, p2: 0, d: 0 });
    //user4 0x2 user5
    tourney = setResult(tourney, 3, { p1: 0, p2: 2, d: 0 });
    //user6 2x0 user7
    tourney = setResult(tourney, 4, { p1: 2, p2: 0, d: 0 });

    //drop user 7
    [tourney] = dropPlayer(tourney, '7');
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get next matches pairings', () => {
    console.log(
      tourney.matches.filter((m) => m.round === tourney.currentRound)
    );
  });
});
