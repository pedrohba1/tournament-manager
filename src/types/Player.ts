import { Results } from './Results';
export type Player = {
  id: string;
  name: string;
  nickname: string;
  etc: unknown;
};

export type TieBreakers = {
  omw: number; //opponent match wins
  ogw: number; // opponent game wins
  pgw: number; // player game wins
};
