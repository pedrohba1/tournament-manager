import { Results } from './Results';
export type Player = {
  id: string;
  name: string;
  nickname: string;
  tiebreakers: TieBreakers;
  etc: unknown;
  bye: boolean;
};

export type TieBreakers = {
  mwp: number; //match-win percetnage
  omwp: number; //opponent match wins percentage
  ogwp: number; // opponent game wins percentage
  gwp: number;
  pgw: number; // player game wins
  matchPoints: number;
  gamePoints: number;
  summary: { w: number; d: number; l: number }; // retirar gamePoints de dentro do summary
};
