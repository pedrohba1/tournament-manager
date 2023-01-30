export type Player = {
  blossomId: number;
  roundOfDrop?: number;
  id: string;
  name: string;
  active: boolean;
  nickname: string;
  tiebreakers: TieBreakers;
  etc: any;
  bye: boolean;
};

export type TieBreakers = {
  byes: number;
  mwp: number; //match-win percetnage
  omwp: number; //opponent match wins percentage
  ogwp: number; // opponent game wins percentage
  gwp: number;
  matchPoints: number;
  gamePoints: number;
  /**
   * @Param position - it will be used only in remote tournaments, to assign
   * each player position in the standings
   */
  position?: number;
  matchesSummary: { w: number; d: number; l: number };
  gamesSummary: { w: number; d: number; l: number };
};
