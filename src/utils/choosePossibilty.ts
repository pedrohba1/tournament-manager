// eslint-disable-next-line @typescript-eslint/no-var-requires
const blossom = require('edmonds-blossom');

export default function choosePossibility(possibilities: unknown[]): number[] {
  const toBlossom = possibilities.map((p) => [
    Number(p[0]),
    Number(p[1]),
    p[2],
  ]);
  return blossom(toBlossom);
}
