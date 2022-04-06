import { Match, Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import { Player } from '../../types/Player';
import shuffle from '../shuffle';
import createNewMatch from '../createNewMatch';

// seed null mean that players are alredy ordered by it's positions/seed
export default function createBracket(
    tourney: Tournament,
    seed?: number
): Tournament {

    const players = seed ? shuffle(tourney.players, seed) : tourney.players;
    const totalSlots = (2 ** Math.ceil(Math.log2(players.length)));
    const matches: Matches = [];

    for (let i = 0; i < totalSlots / 2; i++) {
        matches.push(createNewMatch(players[i], players[totalSlots - 1 - i], tourney));
    }

    tourney.matches = matches;
    return tourney;
}

