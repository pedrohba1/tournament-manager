import { Tournament } from "../../types/Tournament";
import { Match, Matches } from "../../types/Match";
import { Player } from "../../types/Player";

export default function singleEliminationNextRound(tourney: Tournament): Tournament {
    const lastMaches: Matches = tourney.matches.filter(
        (m) => m.round === (tourney.currentRound - 1)
    );
    const players: Player[] = [];

    for (const match of lastMaches) {
        if (match.result.p1 > match.result.p2) {
            players.push(match.playerOne)
        } else {
            players.push(match.playerTwo)
        }
    }

    const totalSlots = (2 ** Math.ceil(Math.log2(players.length)));
    const matches: Matches = [];

    for (let i = 0; i < totalSlots; i += 2) {
        const match = <Match>{
            playerOne: players[i],
            playerTwo: players[i] ? players[i + 1] : { bye: true },
            active: true,
            matchNumber: tourney.lastMatchNumber,
            round: tourney.currentRound,
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

    tourney.matches = matches.concat(tourney.matches);
    return tourney;
}