import { StorageController } from './storage.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { repositoryMock } from '../../../__tests__/__mocks__';
import { IDataServices } from '../core/abstracts';

fdescribe('StorageController', () => {
  let moduleRef: TestingModule;
  let storageController: StorageController;
  let dataServices: IDataServices;

  beforeEach(async () => {
    dataServices = repositoryMock();

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IDataServices)
      .useValue(dataServices)
      .compile();

    storageController = moduleRef.get<StorageController>(StorageController);
  });

  it('should call repository service - findDna', async () => {
    jest
      .spyOn(dataServices.dnaRepository, 'findDna')
      .mockResolvedValue({ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true });

    await storageController.find('ABCDEF,ABCDEF');

    expect(dataServices.dnaRepository.findDna).toHaveBeenCalledTimes(1);
  });

  it('should call repository service - findOne', async () => {
    jest
      .spyOn(dataServices.dnaRepository, 'getAll')
      .mockResolvedValue([{ dnaSequence: 'ABCDEF,ABCDEF', isMutant: true }]);

    await storageController.getAll();

    expect(dataServices.dnaRepository.getAll).toHaveBeenCalledTimes(1);
  });

  it('should call repository service - add', async () => {
    jest.spyOn(dataServices.dnaRepository, 'add');

    await storageController.add({
      dnaSequence: 'ABCDEF,ABCDEF',
      isMutant: true,
    });

    expect(dataServices.dnaRepository.add).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    moduleRef.close();
  });
});
