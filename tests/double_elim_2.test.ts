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

  it('should attempt to run nextorund of  tournament', (done) => {
    let tourney = tourneyExample as Tournament;

    //TODO: precisamos saber o que está travando esse torneio
    // esse torneio está travado no 8 round, e toda vez que tenta entrar no próximo
    // ele dá um erro de Tourney already ended
    console.log(tourney.currentRound);

    tourney = nextRound(tourney);

    done();
  });
});
