import { Result } from '../types/Results';
import { Tournament } from '../types/Tournament';

export default function setResult(
  tourney: Tournament,
  matchNumber: number,
  result: Result
): Tournament {
  if (tourney.options.format === 'remote') {
    throw Error('tournament is remote');
  }

  // fetch match to
  const matchIndex = tourney.matches.findIndex(
    (m) => m.matchNumber === matchNumber
  );
  if (!tourney.matches[matchIndex]) throw Error('match does not exist');
  if (tourney.matches[matchIndex].round !== tourney.currentRound)
    throw Error("can't change result of a past match");

  const { playerOne, playerTwo } = tourney.matches[matchIndex];
  if (playerOne.bye || playerTwo.bye) throw Error('cant set result of bye');
  tourney.matches[matchIndex].result = result;
  tourney.matches[matchIndex].active = false;
  // sets a result of a match
  return tourney;
}
