const DEBUG = false;

export function debug(this: unknown, ...args: unknown[]): void {
  if (DEBUG) {
    console.log.apply(this, args);
  }
}
