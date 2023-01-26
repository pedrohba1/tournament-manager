export function calculateSingleElimMaxRounds(amount: number): number {
  return Math.ceil(Math.log2(amount));
}
