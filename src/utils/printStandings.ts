import { Player } from '../types/Player';

export default function printStandings(standings: Player[]): void {
  for (let i = 0; i < standings.length; i++) {
    console.log(`${i + 1}° - ${standings[i].nickname} (${standings[i].blossomId})`, standings[i].tiebreakers.matchPoints, standings[i].tiebreakers.gamePoints);
  }
}
