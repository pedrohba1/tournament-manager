import { Player } from '../../types/Player';
import { Tournament } from '../../types/Tournament';

export default function getRemoteStandings(tournament: Tournament): Player[] {
  const { players } = tournament;

  // there can't be any player with no position in this case
  if (players.some((p) => p.tiebreakers.position === undefined))
    throw Error('there are players with unset position or position <= 0');

  tournament.remoteStandings = players.sort((pa, pb) => {
    if (
      pa.tiebreakers.position !== undefined &&
      pb.tiebreakers.position !== undefined
    )
      return pa.tiebreakers.position - pb.tiebreakers.position;

    return 0;
  });

  return tournament.remoteStandings; //order these players by position
}
