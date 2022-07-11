import { MongoDataServices } from './mongo-data-services.service';

describe('MongoDataServices', () => {
  let mongoDataServices: MongoDataServices;
  let repository;

  beforeEach(() => {
    repository = jest.fn();
    mongoDataServices = new MongoDataServices(repository);
  });

  it('should be initialized', async () => {
    mongoDataServices.onApplicationBootstrap();

    expect(mongoDataServices).toBeDefined();
    expect(mongoDataServices.dnaRepository).toEqual({
      _repository: repository,
    });
  });
});
