/**
 * This class only contains methods and references within it
 * - there is no references to external imports
 * - no dependencies injected via constructor or setters
 */
export class ClassSelfContained {
  private accumulated: number;

  constructor () {
    this.accumulated = 0;
  }

  add ( amount: number ): void {
    this.accumulated += Math.floor(amount);
  }

  sub ( amount: number ): void {
    this.accumulated -= Math.floor(amount);
  }

  mul ( amount: number ): void {
    this.accumulated *= Math.floor(amount);
  }

  fact (): void {
    let current = this.accumulated;

    if (this.accumulated < 0) return;
    if (this.accumulated === 0) {
      this.accumulated = 1;
      return;
    }
    
    while (--current) {
      this.accumulated *= current;
    }
  }

  result (): number {
    return this.accumulated;
  }
}
