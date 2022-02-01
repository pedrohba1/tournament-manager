export default function choosePossibility(possibilities: unknown[]) {
  const possiblePairings = [];

  for (const poss of possibilities) {
    let leftPos = possibilities.filter(
      (p) => p[0] !== poss[0] && p[0] !== poss[1]
    );
    console.log('left pos from', poss);
    console.log(leftPos);
    for (const left of leftPos) {
      leftPos = possibilities.filter(
        (p) => p[0] !== poss[0] && p[0] !== poss[1]
      );
    }
  }

  return;
}
