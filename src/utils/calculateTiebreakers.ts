import { Tournament } from '../types/Tournament';
import { Player } from '../types/Player';
import { Results } from '../types/Results';

export default function calculateTiebreakers(
  player: Player,
  tourney: Tournament
) {
  // calculate omw, ogw, pgw percentage based on all match results
  // filter matches that his player participated

  const { tiebreakers } = player;
  const playerMatches = tourney.matches
    .filter(
      (item) =>
        item.playerOne.id === player.id || item.playerTwo.id === player.id
    )
    .map((match) => {
      let matchPoint;
    });

  console.log(playerMatches);

  // calculate omw
  // calculate ogw
  // calculate pgw

  return player;
}
