export type matchResult = 0 | 1 | 2;

export type Result = {
  matchNumber: number;
  draws: number;
  matchResult: {
    p1: matchResult;
    p2: matchResult;
    d: matchResult; //TODO: verificar se tem como ter 3 empates.
  };
};

export type Results = Result[];
