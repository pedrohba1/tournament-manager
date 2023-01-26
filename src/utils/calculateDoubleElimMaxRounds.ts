export function calculateDoubleElimMaxRounds(amount: number): number {
  return Math.ceil(Math.log2(amount)) + Math.ceil(Math.log2(Math.log2(amount)));
}
