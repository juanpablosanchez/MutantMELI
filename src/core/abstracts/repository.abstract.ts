export abstract class IRepository<T> {
  abstract add(item: T): Promise<T>;
  abstract findDna(dna: string): Promise<T | null>;
  abstract getAll(): Promise<T[]>;
}
