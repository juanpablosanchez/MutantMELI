import { AutoMap } from '@automapper/classes';

export class Stats {
  @AutoMap()
  mutantQuantity: number;

  @AutoMap()
  humanQuantity: number;

  @AutoMap()
  ratio: number;
}
