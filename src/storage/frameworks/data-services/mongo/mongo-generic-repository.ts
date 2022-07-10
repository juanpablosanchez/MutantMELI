import { FilterQuery, Model } from 'mongoose';
import { IRepository } from 'src/core/abstracts';
import { DnaMongo } from './model';

export class MongoRepository<T> implements IRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  add(item: T): Promise<T> {
    return this._repository.create(item);
  }

  findDna(dna: string): Promise<T> {
    const filters: FilterQuery<DnaMongo> = {};
    filters.dnaSequence = { $eq: dna };

    return this._repository.findOne(filters).exec();
  }

  getAll(): Promise<T[]> {
    return this._repository.find().exec();
  }
}
