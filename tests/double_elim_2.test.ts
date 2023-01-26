import { Tournament } from '../src';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import nextRound from '../src/Tournament/nextRound';
import console from 'console';
const jestConsole = console;

describe('Double elimination tournament test', () => {
  let tourney: Tournament;

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  // it('should attempt to run next orund of  tournament but fail because it already ended', (done) => {
  //   const tourney = tourneyExample as Tournament;

  //   //TODO: precisamos saber o que está travando esse torneio
  //   // esse torneio está travado no 8 round, e toda vez que tenta entrar no próximo
  //   // ele dá um erro de Tourney already ended

  //   // O Torneio está na GRAND FINAL ou seja
  //   //  Quando a partida for setada se o cara da winners ganhar acaba
  //   //  Quando a partida for setada se o cara da losers ganhar tem outro round

  //   expect(() => nextRound(tourney)).toThrow('tourney ended already');

  //   tournamentEnd(tourney);

  //   expect(tourney.ended).toBe(true);
  //   done();
  // });

  it('should create round 5 with 1 match', () => {
    const options: Options = {
      format: 'double-elim',
      gameType: 'magic',
      playoffs: false,
      cutLimit: 8,
      maxRounds: 4,
      bestOf: 3,
      winValue: 3,
      drawValue: 1,
      lossValue: 0,
      playoffsFormat: '',
      seed: 659,
    };

    const players: Player[] = [];
    const amount = 16;
    for (let i = 0; i < amount; i++) {
      const player = {
        id: `${i}`,
        nickname: `user_${i}`,
        name: `name_${i}`,
      } as Player;
      players.push(player);
    }

    tourney = createTourney(options, players);
    tourney = startTourney(tourney);

    Array.from({ length: 8 }, (_v, index) => {
      tourney = setResult(tourney, index + 1, { d: 0, p1: 2, p2: 0 });
    });

    tourney = nextRound(tourney);

    Array.from({ length: 8 }, (_v, index) => {
      tourney = setResult(tourney, index + 9, { d: 0, p1: 2, p2: 0 });
    });

    tourney = nextRound(tourney);

    expect(
      tourney.matches.filter(
        (match) => match.round === 3 && match.winners === true
      ).length
    ).toBe(2);

    expect(
      tourney.matches.filter(
        (match) => match.round === 3 && match.winners === false
      ).length
    ).toBe(4);

    Array.from({ length: 6 }, (_v, index) => {
      tourney = setResult(tourney, index + 17, { d: 0, p1: 2, p2: 0 });
    });

    tourney = nextRound(tourney);

    expect(
      tourney.matches.filter(
        (match) => match.round === 4 && match.winners === true
      ).length
    ).toBe(1);

    expect(
      tourney.matches.filter(
        (match) => match.round === 4 && match.winners === false
      ).length
    ).toBe(2);

    Array.from({ length: 3 }, (_v, index) => {
      tourney = setResult(tourney, index + 23, { d: 0, p1: 2, p2: 0 });
    });

    tourney = nextRound(tourney);

    expect(
      tourney.matches.filter(
        (match) => match.round === 5 && match.winners === true
      ).length
    ).toBe(1);

    expect(
      tourney.matches.filter(
        (match) => match.round === 5 && match.winners === false
      ).length
    ).toBe(1);

    tourney = setResult(tourney, 27, { d: 0, p1: 2, p2: 0 });

    tourney = nextRound(tourney);
  });
});
