import { AutoMap } from '@automapper/classes';

export class Dna {
  @AutoMap()
  dnaSequence: string;

  @AutoMap()
  isMutant: boolean;
}
