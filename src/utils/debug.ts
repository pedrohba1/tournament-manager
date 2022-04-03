const DEBUG = false;

export function debug(...args: unknown[]): void {
  if (DEBUG) {
    console.log.apply(this, args);
  }
}
