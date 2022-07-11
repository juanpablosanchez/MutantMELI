import { StatsController } from './stats.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { StatsUseCases } from '../use-cases';
import { Stats } from '../core/entities';

describe('StatsController', () => {
  let moduleRef: TestingModule;
  let statsController: StatsController;
  let statsUseCases;

  beforeEach(async () => {
    statsUseCases = {
      get: jest.fn(),
    };

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StatsUseCases)
      .useValue(statsUseCases)
      .compile();

    statsController = moduleRef.get<StatsController>(StatsController);
  });

  describe('getIsMutant method', () => {
    it('should return data according to service', async () => {
      jest.spyOn(statsUseCases, 'get').mockImplementation(
        () =>
          ({
            mutantQuantity: 40,
            humanQuantity: 20,
            ratio: 0.5,
          } as Stats),
      );

      const response = await statsController.getStats();

      expect(response.humanQuantity).toBe(20);
      expect(response.mutantQuantity).toBe(40);
      expect(response.ratio).toBe(0.5);
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
