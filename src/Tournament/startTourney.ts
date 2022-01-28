import { Options } from '../types/Options';
import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import pairOpponentsFirstRound from '../utils/pairOpponentsFirstRound';

export default function startTourney(
  tourney: Tournament,
  seed: number
): Tournament {
  // execute function pairOpponents to pair opponents
  tourney = pairOpponentsFirstRound(tourney, seed);
  //Number of rounds and validity of places.
  // Swiss is in general good to decide who ends up at the top spot. (The one player who wins all her games), unfortunedly it is not always clear who should get the 2nd and third place prize. there are many different tiebreakers for doing this
  // An old rule to approximately decide on the number of rounds, number of players and number of validated places was invented by Mr. Model, his formula was:
  // R = (P + 7 x Q) /5
  // In which
  // R is the number of rounds,
  // P is the number of participants, and
  // Q is the number of qualified places
  // This formula can be applied in several ways:
  // Example 1: Suppose there are 20 participants and 3 will receive a prize. In this case the number of rounds is (20 + 7 x 3) : 5 -> (20 + 21) : 5 = 8

  return tourney;
}
