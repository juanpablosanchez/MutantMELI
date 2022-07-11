import { Dna } from '../../../core/entities';
import { MongoRepository } from './mongo-generic-repository';

describe('MongoRepository', () => {
  let mongoRepository: MongoRepository<Dna>;
  let mongoDb;

  beforeEach(() => {
    mongoDb = {};
    mongoDb.create = jest.fn();
    mongoDb.findOne = jest.fn();
    mongoDb.find = jest.fn();

    mongoRepository = new MongoRepository<Dna>(mongoDb);
  });

  it('should call mongo service - create', async () => {
    jest
      .spyOn(mongoDb, 'create')
      .mockResolvedValue({ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true });

    await mongoRepository.add({ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true });

    expect(mongoDb.create).toHaveBeenCalledTimes(1);
  });

  it('should call mongo service - findOne', async () => {
    jest.spyOn(mongoDb, 'findOne').mockImplementation(() => ({
      exec: () => ({ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true }),
    }));

    await mongoRepository.findDna('ABCDEF,ABCDEF');

    expect(mongoDb.findOne).toHaveBeenCalledTimes(1);
  });

  it('should call mongo service - find', async () => {
    jest.spyOn(mongoDb, 'find').mockImplementation(() => ({
      exec: () => [{ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true }],
    }));

    await mongoRepository.getAll();

    expect(mongoDb.find).toHaveBeenCalledTimes(1);
  });
});
