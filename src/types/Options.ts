export type Options = {
  seed?: number;
  format: string; //'swiss' || 'single-elim' || 'double-elim';
  gameType: string; // 'magic' | 'lol' | 'csgo' | 'pokemon';
  playoffs: boolean;
  cutLimit: number; // 8
  bestOf: number; // 3
  winValue: number; //3
  maxRounds: null | number;
  drawValue: number; //1
  lossValue: number; //0
};
