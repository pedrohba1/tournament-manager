
import {Match} from 'tournament-manager'
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

  // NOTE manually pushing rounds to represent a full tourney, remove it if you need
  // rounds.push({
  //   title: "Round 2",
  //   seeds: [
  //     {
  //       id: 1,
  //       date: new Date().toDateString(),
  //       teams: [{ name: 'user_2' }, { name: 'user_0' }],
  //     },
  //     {
  //       id: 2,
  //       date: new Date().toDateString(),
  //       teams: [{ name: 'user_1' }, { name: 'user_4' }],
  //     },
  //   ]
  // })

  // rounds.push({
  //   title: "Round 3",
  //   seeds: [
  //     {
  //       id: 1,
  //       date: new Date().toDateString(),
  //       teams: [{ name: 'user_2' }, { name: 'user_1' }],
  //     }
  //   ]
  // })

  const filteredRounds = rounds.filter(round => {
    if (round.seeds.length <= 8) {
      return round;
    }
    return round;
  });

  return filteredRounds;
};
