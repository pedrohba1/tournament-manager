import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import { Tournament } from '../src';
import console from 'console';
const jestConsole = console;

describe('Sort function', () => {
  let tourney: Tournament;
  let players: Player[] = [];

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  beforeAll(() => {
    const options: Options = {
      seed: 830,
      format: 'single-elim',
      gameType: 'lol',
      playoffs: false,
      cutLimit: 8,
      bestOf: 3,
      winValue: 1,
      drawValue: 1,
      lossValue: 0,
      maxRounds: null,
      playoffsFormat: '',
    };

    const amount = 41;
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

    tourney = setResult(tourney, 2, { d: 0, p1: 0, p2: 2 }); //jesiuu9vkf
    tourney = setResult(tourney, 6, { d: 0, p1: 0, p2: 2 }); //Moxileiro Ancião
    tourney = setResult(tourney, 8, { d: 0, p1: 0, p2: 2 }); //UmPlayerMediano
    tourney = setResult(tourney, 10, { d: 0, p1: 2, p2: 0 }); //migujowhev
    tourney = setResult(tourney, 14, { d: 0, p1: 0, p2: 2 }); //ozenv4vvqq
    tourney = setResult(tourney, 18, { d: 0, p1: 2, p2: 0 }); //Isaias_Bezz
    tourney = setResult(tourney, 22, { d: 0, p1: 2, p2: 0 }); //cauayc7grf
    tourney = setResult(tourney, 26, { d: 0, p1: 2, p2: 0 }); //Yuki
    tourney = setResult(tourney, 30, { d: 0, p1: 2, p2: 0 }); //alva2m6ivf

    tourney = nextRound(tourney);

    tourney = setResult(tourney, 33, { d: 0, p1: 0, p2: 2 }); //jesiuu9vkf
    tourney = setResult(tourney, 34, { d: 0, p1: 2, p2: 0 }); //Gatovisck
    tourney = setResult(tourney, 35, { d: 0, p1: 2, p2: 0 }); //luigveap9w
    tourney = setResult(tourney, 36, { d: 0, p1: 0, p2: 2 }); //UmPlayerMediano
    tourney = setResult(tourney, 37, { d: 0, p1: 2, p2: 0 }); //mathslxk14
    tourney = setResult(tourney, 38, { d: 0, p1: 2, p2: 0 }); //Ryuki
    tourney = setResult(tourney, 39, { d: 0, p1: 2, p2: 0 }); //braytf25aq
    tourney = setResult(tourney, 40, { d: 0, p1: 0, p2: 2 }); //mate1cj9lf
    tourney = setResult(tourney, 41, { d: 0, p1: 2, p2: 0 }); //gatod1lq3k
    tourney = setResult(tourney, 42, { d: 0, p1: 0, p2: 2 }); //Laurflufun
    tourney = setResult(tourney, 43, { d: 0, p1: 2, p2: 0 }); //welz6aqbu7
    tourney = setResult(tourney, 44, { d: 0, p1: 2, p2: 0 }); //diegwdunjh
    tourney = setResult(tourney, 45, { d: 0, p1: 2, p2: 0 }); //pedrmw1248
    tourney = setResult(tourney, 46, { d: 0, p1: 0, p2: 2 }); //bulkdk6dno
    tourney = setResult(tourney, 47, { d: 0, p1: 0, p2: 2 }); //alva2m6ivf
    tourney = setResult(tourney, 48, { d: 0, p1: 2, p2: 0 }); //Yeageh

    tourney = nextRound(tourney);

    tourney = setResult(tourney, 49, { d: 0, p1: 0, p2: 2 }); //Gatovisck
    tourney = setResult(tourney, 50, { d: 0, p1: 0, p2: 2 }); //UmPlayerMediano
    tourney = setResult(tourney, 51, { d: 0, p1: 2, p2: 0 }); //mathslxk14
    tourney = setResult(tourney, 52, { d: 0, p1: 2, p2: 0 }); //mate1cj9lf
    tourney = setResult(tourney, 53, { d: 0, p1: 2, p2: 0 }); //gatod1lq3k
    tourney = setResult(tourney, 54, { d: 0, p1: 0, p2: 2 }); //diegwdunjh
    tourney = setResult(tourney, 55, { d: 0, p1: 2, p2: 0 }); //pedrmw1248
    tourney = setResult(tourney, 56, { d: 0, p1: 0, p2: 2 }); //Yeageh

    tourney = nextRound(tourney);

    tourney = setResult(tourney, 57, { d: 0, p1: 0, p2: 2 }); //UmPlayerMediano
    tourney = setResult(tourney, 58, { d: 0, p1: 0, p2: 2 }); //mate1cj9lf
    tourney = setResult(tourney, 59, { d: 0, p1: 0, p2: 2 }); //diegwdunjh
    tourney = setResult(tourney, 60, { d: 0, p1: 2, p2: 0 }); //pedrmw1248

    tourney = nextRound(tourney);

    tourney = setResult(tourney, 61, { d: 0, p1: 2, p2: 0 }); //UmPlayerMediano
    tourney = setResult(tourney, 62, { d: 0, p1: 2, p2: 0 }); //diegwdunjh

    tourney = nextRound(tourney);

    // TODO: aqui na última partida, deve ter uma partida entre o terceiro e o quarto
    // lugar, para que seja feito o desempate.
    tourney = setResult(tourney, 63, { d: 0, p1: 2, p2: 0 }); //UmPlayerMediano

    players = tournamentEnd(tourney);
  });

  it('should get sorted standings', () => {
    expect(players[0].nickname).toBe('user_24');
    expect(players[1].nickname).toBe('user_0');
    expect(players[2].nickname).toBe('user_6');
    expect(players[3].nickname).toBe('user_25');
  });
});
