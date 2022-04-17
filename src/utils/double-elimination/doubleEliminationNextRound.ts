import { Tournament } from '../../types/Tournament';
import { Matches } from '../../types/Match';
import advanceBracket from '../single-elimination/advanceBracket';
import getMatchesLosers from '../getMatchesLosers';
import playersPairing from '../single-elimination/playersPairing';
import sendToLosersBracket from './sendToLosersBracket';
import createGrandFinals from './createGrandFinals';

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
    playersPairing(matches, losers, tourney, false);
  } else if (tourney.currentRound == tourney.options.maxRounds - 1) {
    const winnersMatches: Matches = tourney.matches.filter(
      (m) => m.round === tourney.currentRound - 2 && m.winners
    );

    matches.push(createGrandFinals(winnersMatches, losersMatches, tourney));
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
