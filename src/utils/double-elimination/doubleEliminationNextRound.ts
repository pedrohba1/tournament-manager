import { Tournament } from '../../types/Tournament';
import { Matches } from '../../types/Match';
import advanceBracket from '../single-elimination/advanceBracket';
import getMatchesLosers from '../getMatchesLosers';
import playersPairing from '../single-elimination/playersPairing';
import sendToLosersBracket from './sendToLosersBracket';
import createGrandFinals from './createGrandFinals';

export default function doubleEliminationNextRound(
  tourney: Tournament,
  playoffsRelativeRound?: number
): Tournament {
  const winnersMatches: Matches = [];
  const losersMatches: Matches = [];
  const newMatches: Matches = [];

  tourney.matches.forEach((m) => {
    if (m.round === tourney.currentRound - 1) {
      if (m.winners) winnersMatches.push(m);
      else losersMatches.push(m);
    }
  });

  // Segundo round ocorre para montar a losers bracket
  if (
    (playoffsRelativeRound ? playoffsRelativeRound : tourney.currentRound) === 2
  ) {
    const losers = getMatchesLosers(winnersMatches);

    advanceBracket(newMatches, winnersMatches, tourney);
    playersPairing(newMatches, losers, tourney, false);

    // Ultimo round cria a grande final
  } else if (tourney.currentRound === tourney.options.maxRounds) {
    const winnersMatches: Matches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound - 1 && m.winners
    );

    newMatches.push(createGrandFinals(winnersMatches, losersMatches, tourney));
  } else {
    advanceBracket(newMatches, winnersMatches, tourney);
    sendToLosersBracket(newMatches, winnersMatches, losersMatches, tourney);

    // advanceBracket(newMatches, losersMatches, tourney, false);
  }

  tourney.matches = tourney.matches.concat(newMatches);
  return tourney;
}
