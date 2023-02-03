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
import { setPlayerStanding } from '../src/utils/remote/setPlayerStanding';
import { setMatchPoints } from '../src/utils/remote/setMatchPoints';
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

  it('should start tourney with blank matches', (done) => {
    tourney = startTourney(tourney);
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(currentMatches).toHaveLength(4);

    const standings = getStandings(tourney);

    // in this case, matches start with zero values
    expect(currentMatches[1].result).toEqual({ d: 0, p1: 0, p2: 0 });
    done();
  });

  it('should not allow to set result', (done) => {
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );

    expect(() =>
      setResult(tourney, currentMatches[0].matchNumber, { d: 0, p1: 2, p2: 0 })
    ).toThrow('tournament is remote');

    done();
  });

  it('should have already some player standings setted', (done) => {
    for (const player of tourney.players) {
      expect(player.tiebreakers.position).toBeDefined();
    }

    done();
  });

  it('should allow to set up position for players and it should swap for the player that is in that position', (done) => {
    tourney = setPlayerStanding(tourney, tourney.players[0].id, 3);
    expect(
      tourney.players.find((player) => player.id === '3')?.tiebreakers.position
    ).toBe(3);
    expect(
      tourney.players.find((player) => player.id === '0')?.tiebreakers.position
    ).toBe(4);

    for (const player of tourney.players) {
      expect(player.tiebreakers.position).toBeDefined();
    }

    done();
  });

  it('should allow to set matchPoints that will be used to rank players', (done) => {
    for (const player of tourney.players) {
      expect(player.tiebreakers.matchPoints).toBe(0);

      setMatchPoints(tourney, player.id, 3);

      expect(player.tiebreakers.matchPoints).toBe(3);
    }

    done();
  });

  it('should not allow to set player in a position that does not exist', (done) => {
    expect(() => setPlayerStanding(tourney, tourney.players[0].id, 10)).toThrow(
      'position must be a number between 0 and the total of players -1'
    );

    done();
  });

  it('should not allow to set next round', (done) => {
    expect(() => nextRound(tourney)).toThrow('tournament is remote');
    done();
  });

  it(`it should allow to end only if all players are positioned in the standings
  and the matchPoints should be the ones set before
  `, (done) => {
    const finalStandings = tournamentEnd(tourney);

    for (let i = 0; i < finalStandings.length; i++) {
      const player = finalStandings[i];
      expect(player.tiebreakers.position).toBe(i);
      expect(player.tiebreakers.matchPoints).toBe(3);
    }

    expect(tourney.ended).toBe(true);
    done();
  });
});
