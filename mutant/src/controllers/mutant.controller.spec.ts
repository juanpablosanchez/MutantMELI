import { MutantController } from './mutant.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { MutantUseCases } from '../use-cases';

describe('MutantController', () => {
  let moduleRef: TestingModule;
  let mutantController: MutantController;
  let mutantUseCases;

  beforeEach(async () => {
    mutantUseCases = {
      isMutant: jest.fn(),
    };

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MutantUseCases)
      .useValue(mutantUseCases)
      .compile();

    mutantController = moduleRef.get<MutantController>(MutantController);
  });

  describe('getIsMutant method', () => {
    it('should return false according to service', async () => {
      jest.spyOn(mutantUseCases, 'isMutant').mockImplementation(() => true);

      const response = await mutantController.getIsMutant({
        dnaSequence: 'ABCDE,ABCDE',
        isMutant: false,
      });

      expect(response).toBe(true);
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
