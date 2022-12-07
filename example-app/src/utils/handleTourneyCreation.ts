import { startTourney, Options, Player, createTourney } from "tournament-manager";

export const handleTourneyCreation = () =>{
    const options = {
        seed: 10,
        format: 'single-elim',
        gameType: 'magic',
        hasPlayoffs: false,
        cutLimit: 8,
        maxRounds: 40,
        bestOf: 3,
        winValue: 3,
        maxRound: null,
        drawValue: 1,
        lossValue: 0,
        playoffsFormat: '',
      } as Options;
  
      const players = <Player[]>[];
      const amount = 5;
      for (let i = 0; i < amount; i++) {
        const player = <Player>{
          id: `${i}`,
          nickname: `user_${i}`,
          name: `name_${i}`,
        };
        players.push(player);
      }
  
      const tourney = createTourney(options, players)
      return startTourney(tourney);
}