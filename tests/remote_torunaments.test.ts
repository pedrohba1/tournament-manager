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

describe('remote tournament test', () => {
  let tourney: Tournament;

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('should create a remote tournament', (done) => {
    const options = <Options>{
      seed: 10,
      format: 'remote',
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
    expect(tourney.options.format).toBe('remote');
    done();
  });

  it('should start tourney with matches', (done) => {
    tourney = startTourney(tourney);
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(4);

    const standings = getStandings(tourney);

    expect(currentMatches[1].result).toBeNull();
    done();
  });


  it('should allow to set up standings orders for players', (done) => {
  
  
    done();
  });



});
