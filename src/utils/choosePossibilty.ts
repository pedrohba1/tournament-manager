const blossom = require('edmonds-blossom');

const DEBUG = false;

function debug(...args) {
  if (DEBUG) {
    console.log.apply(this, args);
  }
}

export default function choosePossibility(possibilities: unknown[]): number[] {
  const possiblePairings = [];

  debug(possibilities);

  const toBlossom = possibilities.map((p) => [
    Number(p[0]),
    Number(p[1]),
    p[2],
  ]);

  return blossom(toBlossom);
}
