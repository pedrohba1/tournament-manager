export type Options = {
  seed: number;
  format: string;
  gameType: string;
  playoffs: boolean;
  cutLimit: 8;
  bestOf: 3;
  winValue: 3;
  maxRounds: null | number;
  drawValue: 1;
  lossValue: 0;
};
