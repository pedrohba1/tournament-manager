import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import { dropPlayer, Tournament } from '../src';
import console from 'console';
import undropPlayer from '../src/Tournament/undropPlayer';
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
      hasPlayoffs: false,
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
    expect(tourney.ended).toBe(false);
    expect(tourney.players.length).toBe(8);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });

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

  it('should drop player', () => {
    [tourney] = dropPlayer(tourney, '2');
    const playerIndex = tourney.players.findIndex((p) => p.id === '2');
    const player = tourney.players[playerIndex];
    expect(player.active).toBe(false);
  });

  it('a dropped player should assign its active match as 2x0 to his opponent', () => {
    // match number 2 should have playerTwo with 2x0
    const matchIndex = tourney.matches.findIndex((m) => m.matchNumber === 2);
    const match = tourney.matches[matchIndex];
    expect(match.result).toMatchObject({ p1: 0, p2: 2, d: 0 });
    expect(match.playerOne.active).toBe(false);
    expect(match.playerTwo.active).toBe(true);
    expect(match.active).toBe(false);
  });

  it('should drop another player, but playerTwo this time', () => {
    [tourney] = dropPlayer(tourney, '5');
    const playerIndex = tourney.players.findIndex((p) => p.id === '5');
    const player = tourney.players[playerIndex];
    expect(player.active).toBe(false);
  });

  it(`another player and should 
  assign its active match as 0x2 to his opponent`, () => {
    // match number 2 should have playerTwo with 2x0
    const matchIndex = tourney.matches.findIndex((m) => m.matchNumber === 3);
    const match = tourney.matches[matchIndex];
    expect(match.result).toMatchObject({ p1: 2, p2: 0, d: 0 });
    expect(match.playerOne.active).toBe(true);
    expect(match.playerTwo.active).toBe(false);
    expect(match.active).toBe(false);
  });

  it(`should undrop a player`, () => {
    [tourney] = undropPlayer(tourney, '2');
    const playerIndex = tourney.players.findIndex((p) => p.id === '2');
    const player = tourney.players[playerIndex];
    expect(player.active).toBe(true);
  });

  it(`undropped player should be marked as active in match`, () => {
    const matchIndex = tourney.matches.findIndex((m) => m.matchNumber === 2);
    const match = tourney.matches[matchIndex];
    expect(match.result).toMatchObject({ p1: 0, p2: 2, d: 0 });
    expect(match.playerOne.active).toBe(true);
    expect(match.playerTwo.active).toBe(true);
    expect(match.active).toBe(false);
  });
});
