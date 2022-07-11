export class Stats {
  mutantQuantity: number;
  humanQuantity: number;
  ratio: number;

  constructor(mutantQuantity: number, humanQuantity: number) {
    this.mutantQuantity = mutantQuantity;
    this.humanQuantity = humanQuantity;

    this.ratio =
      mutantQuantity === 0 || humanQuantity === 0
        ? null
        : mutantQuantity / humanQuantity;
  }
}
