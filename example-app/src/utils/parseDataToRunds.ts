
import {} from 'tournament-manager'
import { IRoundProps } from "react-brackets";

export const parseDataToRounds = (matches?: Match[]): IRoundProps[] => {
  if (!matches) return [];
  const rounds: IRoundProps[] = [];

  matches.forEach(match => {
    if (!rounds[match.round]) {
      rounds[match.round] = {
        title: `Round ${match.round}`,
        seeds: [],
      };
    }

    const seed = {
      id: match.playerOne.id + match.playerTwo.id,
      teams: [
        { name: match.playerOne.nickname },
        { name: match.playerTwo.nickname },
      ],
    };

    rounds[match.round].seeds.push(seed);
  });

  const filteredRounds = rounds.filter(round => {
    if (round.seeds.length <= 8) {
      return round;
    }
    return undefined;
  });

  return filteredRounds;
};
