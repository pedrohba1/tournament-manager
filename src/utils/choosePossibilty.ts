import blossom from 'edmonds-blossom';

type ITuple = [number, number, number];
type IChoosePossibleTuple = [ITuple, ITuple];

export default function choosePossibility(
  possibilities: IChoosePossibleTuple
): number[] {
  const toBlossom = possibilities.map((p) => [p[0], p[1], p[2]]);
  return blossom(toBlossom);
}
