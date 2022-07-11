import { StatsController } from './';
import { IBusService } from '../core/abstracts/bus.abstract';
import { clientProxyMock } from '../../../__tests__/__mocks__';
import { Stats } from '../core/entities';
import { of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('StatsController', () => {
  let moduleRef: TestingModule;
  let statsController: StatsController;
  let busServices: IBusService;

  beforeEach(async () => {
    busServices = clientProxyMock();

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IBusService)
      .useValue(busServices)
      .compile();

    statsController = moduleRef.get<StatsController>(StatsController);
  });

  describe('getStats method', () => {
    it('should return stats from busService', async () => {
      jest.spyOn(busServices.client, 'send').mockImplementation(() =>
        of({
          humanQuantity: 40,
          mutantQuantity: 20,
          ratio: 0.5,
        } as Stats),
      );

      const response = await statsController.getStats();

      expect(response.count_human_dna).toBe(40);
      expect(response.count_mutant_dna).toBe(20);
      expect(response.ratio).toBe(0.5);
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
