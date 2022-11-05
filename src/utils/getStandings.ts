import { Player } from '../types/Player';
import { Tournament } from '../types/Tournament';
import getStandingsDoubleElim from './double-elimination/getStandingsDoubleElim';
import getStandingsSingleElim from './single-elimination/getStandingsSingleElim';
import getStandingsSwiss from './swiss/getStandingsSwiss';

export default function getStandings(tournament: Tournament): Player[] {
  const { players } = tournament;
  if (tournament.options.format === 'swiss') return getStandingsSwiss(players);
  if (tournament.options.format === 'single-elim')
    return getStandingsSingleElim(tournament.matches, players);
  if (tournament.options.format === 'double-elim')
    return getStandingsDoubleElim(tournament.matches, players);
}
