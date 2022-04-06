import { Match } from "../types/Match";
import { Player } from "../types/Player";
import { Tournament } from "../types/Tournament";

export default function createNewMatch(playerOne: Player, playerTwo: Player, tourney: Tournament): Match {
    const match = <Match>{
        playerOne: playerOne,
        playerTwo: playerTwo ? playerTwo : { bye: true },
        active: true,
        matchNumber: tourney.lastMatchNumber,
        round: tourney.currentRound,
        result: null,
    };
    if (match.playerTwo.bye) {
        match.result = { d: 0, p1: 2, p2: 0 };
        match.active = false;
        const playerByIndex = tourney.players.findIndex(
            (p) => p.id === playerOne.id
        );
        tourney.players[playerByIndex].tiebreakers.byes += 1;
    }
    tourney.lastMatchNumber += 1;
    return match;
}