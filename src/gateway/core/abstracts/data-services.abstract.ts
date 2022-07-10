import { Dna } from '../entities';
import { IRepository } from './repository.abstract';

export abstract class IDataServices {
  abstract dnaRepository: IRepository<Dna>;
}
