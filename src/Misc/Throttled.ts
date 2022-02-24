export class Debounced {
  private limited: boolean = false;
  constructor(private func: Function, private rate_per_sec: number) {}
  run(...args: any[]) {
    if (!this.limited) {
      this.func.apply(null, args);
      this.limited = true;
      setTimeout(() => {
        this.limited = false;
      }, 1000 / this.rate_per_sec);
    }
  }
}
