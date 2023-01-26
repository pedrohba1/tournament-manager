import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import getStandingsSwiss from './swiss/getStandingsSwiss';

export default function getStandings(tournament: Tournament): Player[] {
  const { players } = tournament;
  return getStandingsSwiss(players);
}
