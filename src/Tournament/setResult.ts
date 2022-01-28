import { Match } from '../types/Match';
import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Result } from '../types/Results';
import { Tournament } from '../types/Tournament';

export default function setResult(
  tourney: Tournament,
  matchNumber: number,
  result: Result
): Tournament {
  // fetch match to
  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === matchNumber
  );
  if (tourney.matches[matchIndex].round !== tourney.currentRound)
    throw new Error("can't change result of a past match");
  tourney.matches[matchIndex].result = result;
  tourney.matches[matchIndex].active = false;
  // sets a result of a match
  return tourney;
}
