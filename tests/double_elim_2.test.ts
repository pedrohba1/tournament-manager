import { Tournament } from '../src';
import { Options } from '../src/types/Options';
import { Player } from '../src/types/Player';
import createTourney from '../src/Tournament/createTourney';
import startTourney from '../src/Tournament/startTourney';
import setResult from '../src/Tournament/setResult';
import nextRound from '../src/Tournament/nextRound';
import tournamentEnd from '../src/Tournament/tournamentEnd';
import console from 'console';
import tourneyExample from '../tests/utils/example1.json';
const jestConsole = console;

describe('Double elimination tournament test', () => {
  let tourney: Tournament;

  beforeEach(() => {
    global.console = require('console');
  });

  afterEach(() => {
    global.console = jestConsole;
  });

  it('should attempt to run next orund of  tournament but fail because it already ended', (done) => {
    const tourney = tourneyExample as Tournament;

    //TODO: precisamos saber o que está travando esse torneio
    // esse torneio está travado no 8 round, e toda vez que tenta entrar no próximo
    // ele dá um erro de Tourney already ended
    for (const match of tourney.matches) {
      console.log(
        `[${match.round}] (${match.winners ? 'W' : 'L'}) ${
          match.playerOne.nickname
        } x ${match.playerTwo.bye ? '_' : match.playerTwo.nickname}`
      );
    }

    // O Torneio está na GRAND FINAL ou seja
    //  Quando a partida for setada se o cara da winners ganhar acaba
    //  Quando a partida for setada se o cara da losers ganhar tem outro round
    console.log(tourney.matches[tourney.matches.length - 1]);

    expect(() => nextRound(tourney)).toThrow('tourney ended already');

    const standings = tournamentEnd(tourney);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }

    expect(tourney.ended).toBe(true);
    done();
  });
});
