export type Options = {
  format: 'swiss';
  gameType: 'magic' | 'lol' | 'csgo' | 'pokemon';
  playoffs: boolean;
  cutLimit: 8;
  bestOf: 3;
  winValue: 3;
  maxRound: null | number;
  drawValue: 1;
  lossValue: 0;
};
