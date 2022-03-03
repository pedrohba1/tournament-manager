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
import isPair from './utils/isPair';
import isPairByNick from './utils/isPairByNick';
const jestConsole = console;

describe('13 players scenario 1', () => {
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
      maxRound: 4,
      drawValue: 1,
      lossValue: 0,
    };

    const players = <Player[]>[];
    const amount = 13;
    players.push(<Player>{
      id: `ID_1`,
      nickname: `Leo 1`,
      name: `name_2`,
    });
    players.push(<Player>{
      id: `ID_2`,
      nickname: `MBispo 2`,
      name: `name_2`,
    });
    players.push(<Player>{
      id: `ID_3`,
      nickname: `Paulo 3`,
      name: `name_3`,
    });
    players.push(<Player>{
      id: `ID_4`,
      nickname: `cariane 4`,
      name: `name_4`,
    });
    players.push(<Player>{
      id: `ID_5`,
      nickname: `judebiasi 5`,
      name: `name_5`,
    });
    players.push(<Player>{
      id: `ID_6`,
      nickname: `caiogiovanni 6`,
      name: `name_6`,
    });
    players.push(<Player>{
      id: `ID_7`,
      nickname: `lucasGiggs 7`,
      name: `name_7`,
    });
    players.push(<Player>{
      id: `ID_8`,
      nickname: `remoto 8`,
      name: `name_8`,
    });
    players.push(<Player>{
      id: `ID_9`,
      nickname: `black72 9`,
      name: `name_9`,
    });
    players.push(<Player>{
      id: `ID_10`,
      nickname: `iBarone 10`,
      name: `name_10`,
    });
    players.push(<Player>{
      id: `ID_11`,
      nickname: `Garrido 11`,
      name: `name_11`,
    });
    players.push(<Player>{
      id: `ID_12`,
      nickname: `Viralata 12`,
      name: `name_12`,
    });
    players.push(<Player>{
      id: `ID_13`,
      nickname: `mateus34 13`,
      name: `name_13`,
    });

    tourney = createTourney(options, players);
    expect(tourney.ended).toBe(false);
  });

  it('should start tourney and assign matches', () => {
    tourney = startTourney(tourney);
  });

  it('should set results', () => {
    tourney = setResult(tourney, 1, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 2, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 3, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 4, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 5, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 6, { d: 0, p1: 2, p2: 1 });

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

  it('should drop leo', () => {
    [tourney] = dropPlayer(tourney, 'ID_1');
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings', () => {
    const standings = getStandings(tourney.players);
    console.log(`round ${tourney.currentRound - 1} standings:`);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });

  it('should get correct pairings', () => {
    // expect(isPairByNick('caiogiovanni', 'remoto', tourney)).toBe(true);
    // expect(isPairByNick('lucasGiggs', 'judebiasi', tourney)).toBe(true);
    // expect(isPairByNick('mateus34', 'iBarone', tourney)).toBe(true);
    // expect(isPairByNick('black72', 'Garrido', tourney)).toBe(true);
    // expect(isPairByNick('Viralata', 'cariane', tourney)).toBe(true);
    // expect(isPairByNick('MBispo', 'Paulo', tourney)).toBe(true);
  });

  it('should set results for round 2', () => {
    tourney = setResult(tourney, 8, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 9, { d: 0, p1: 0, p2: 2 });
    tourney = setResult(tourney, 10, { d: 0, p1: 1, p2: 2 });
    tourney = setResult(tourney, 11, { d: 0, p1: 2, p2: 0 });
    tourney = setResult(tourney, 12, { d: 0, p1: 2, p2: 1 });
    tourney = setResult(tourney, 13, { d: 0, p1: 0, p2: 2 });

    console.log('second round matches with results setted');
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: {
          nickname: match.playerOne.nickname,
          blossomId: match.playerOne.blossomId,
        },
        playerTwo: {
          nickname: match.playerTwo.nickname,
          blossomId: match.playerTwo.blossomId,
        },
        results: match.result,
      });
    }
  });

  it('should drop cariane, ibarone', () => {
    [tourney] = dropPlayer(tourney, 'ID_4');
    [tourney] = dropPlayer(tourney, 'ID_10');
  });

  it('should start next round', () => {
    tourney = nextRound(tourney);
  });

  it('should get partial standings', () => {
    const standings = getStandings(tourney.players);
    console.log(`round ${tourney.currentRound - 1} standings:`);
    for (const standing of standings) {
      console.table({ ...standing.tiebreakers, nickname: standing.nickname });
    }
  });

  it('should get expected pairings', () => {
    // mbispo vs judebiasi
    // paulo vs lucasgiggs
    // black72 vs garrido
    // mateus34 vs  caiogivanni
    // Viralata vs remoto
  });

  it('should set results for round 3', () => {
    console.log('round 3 matches with results setted');
    const currentMatches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound
    );
    for (const match of currentMatches) {
      console.table({
        '#': match.matchNumber,
        playerOne: {
          nickname: match.playerOne.nickname,
          blossomId: match.playerOne.blossomId,
        },
        playerTwo: {
          nickname: match.playerTwo.nickname,
          blossomId: match.playerTwo.blossomId,
        },
        results: match.result,
      });
    }
  });
});
