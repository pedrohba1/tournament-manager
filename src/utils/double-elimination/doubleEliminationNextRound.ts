import { Tournament } from '../../types/Tournament';
import { Matches } from '../../types/Match';
import createNewMatch from '../createNewMatch';
import advanceBracket from '../single-elimination/advanceBracket';
import getMatchesLosers from '../getMatchesLosers';
import playersPairing from '../single-elimination/playersPairing';
import sendToLosersBracket from './sendToLosersBracket';

export default function doubleEliminationNextRound(
  tourney: Tournament
): Tournament {
  const losersMatches: Matches = tourney.matches.filter(
    (m) => m.round === tourney.currentRound - 1 && !m.winners
  );
  const matches: Matches = [];

  if (tourney.currentRound == 2) {
    const winnersMatches: Matches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound - 1 && m.winners
    );
    const losers = getMatchesLosers(winnersMatches);
    advanceBracket(matches, winnersMatches, tourney);

    const losersBracketMatches = playersPairing(losers, tourney, false);
    for (const match of losersBracketMatches) {
      matches.push(match);
    }
  } else if (tourney.currentRound == tourney.options.maxRounds) {
    const winnersMatches: Matches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound - 2 && m.winners
    );

    const winnerWb =
      winnersMatches[0].result.p1 > winnersMatches[0].result.p2
        ? winnersMatches[0].playerOne
        : winnersMatches[0].playerTwo;
    const winnerLb =
      losersMatches[0].result.p1 > losersMatches[0].result.p2
        ? losersMatches[0].playerOne
        : losersMatches[0].playerTwo;

    matches.push(createNewMatch(winnerWb, winnerLb, tourney));
  } else {
    if (tourney.currentRound % 2 != 0) {
      const winnersMatches: Matches = tourney.matches.filter(
        (m) => m.round === tourney.currentRound - 1 && m.winners
      );

      sendToLosersBracket(matches, winnersMatches, losersMatches, tourney);
    } else {
      const winnersMatches: Matches = tourney.matches.filter(
        (m) => m.round === tourney.currentRound - 2 && m.winners
      );

      advanceBracket(matches, winnersMatches, tourney);
      advanceBracket(matches, losersMatches, tourney, false);
    }
  }

  tourney.matches = matches.concat(tourney.matches);
  return tourney;
}

// 1 Primeira rodada
//      winners é jogada
//      losers bracket é montado com perdedores
//      winners bracket é avançada
// 2 Segunda rodada
//      winners é jogada
//      losers é jogada
//      winners bracket é avançada
//      perdedores da winners são adicionadas a losers
// 3 Terceira rodada
//      losers é jogada
//      vencedores da losers são pareados entre si
// 4 Quarta rodada
//      winners é jogada
//      losers é jogada
//      winners bracket é avançada
//      perdedores da winners são adicionadas a losers
// 5 Quinta rodada
//      losers é jogada
//      vencedores da losers são pareados entre si
// ...
// Grande final
//      ultimo player que sobrar da winners
//      ultimo player que sobrar da losers
