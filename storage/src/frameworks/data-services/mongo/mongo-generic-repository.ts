import { FilterQuery, Model } from 'mongoose';
import { IRepository } from '../../../core/abstracts';
import { DnaMongo } from './model';

/* Implementa una base de datos en MongoDB de acuerdo a la interfaz IRepository */
export class MongoRepository<T> implements IRepository<T> {
  private _repository: Model<T>;

  constructor(repository: Model<T>) {
    this._repository = repository;
  }

  /**
   * Crea un nuevo item de la base de datos.
   * @param {T} item - T - Item a agregar.
   * @returns promise de tipo T
   */
  add(item: T): Promise<T> {
    return this._repository.create(item);
  }

  /**
   * Encuenta un cocumento en la base de datos, en dónde la secuencia de ADN {propiedad: dnaSequence}
   * sea igual al ADN que llega como parámetro.
   * @param {string} dna - string - Secuencia de AND a buscar
   * @returns promise de tipo T
   */
  findDna(dna: string): Promise<T> {
    const filters: FilterQuery<DnaMongo> = {};
    filters.dnaSequence = { $eq: dna };

    return this._repository.findOne(filters).exec();
  }

  /**
   * Retorna todos los item guardados en la base de datos.
   * @returns Lista de objectos de tipo T.
   */
  getAll(): Promise<T[]> {
    return this._repository.find().exec();
  }
}
