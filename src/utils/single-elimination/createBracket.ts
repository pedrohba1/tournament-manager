import { Match, Matches } from '../../types/Match';
import { Tournament } from '../../types/Tournament';
import { Player } from '../../types/Player';
import shuffle from '../shuffle';

// Option null seed mean that players are alredy ordered by it's positions/seed
export default function createBracket(
    tourney: Tournament,
    seed?: number
): Tournament {
    // Players deverão ter seed de modo a deixar as matches mais organizadas
    // Número de players deve ser uma potência de 2
    //      players null para faze-lo avançar automaticamente

    const players = seed ? shuffle(tourney.players, seed) : tourney.players;
    const totalSlots = (2 ** Math.ceil(Math.log2(players.length)));
    const matches: Matches = [];

    // Falta fazer o pareamento se existir seeds
    for (let i = 0; i < totalSlots / 2; i++) {
        const match = <Match>{
            playerOne: players[i],
            playerTwo: players[totalSlots - 1 - i] ? players[totalSlots - 1 - i] : { bye: true },
            active: true,
            matchNumber: tourney.lastMatchNumber,
            round: 1,
            result: null,
        };
        if (match.playerTwo.bye) {
            match.result = { d: 0, p1: 2, p2: 0 };
            match.active = false;
            const playerByIndex = tourney.players.findIndex(
                (p) => p.id === players[i].id
            );
            tourney.players[playerByIndex].tiebreakers.byes += 1;
        }
        tourney.lastMatchNumber += 1;
        matches.push(match);
    }

    tourney.matches = matches;
    return tourney;
}

