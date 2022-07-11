import { StatsUseCases } from './stats.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { clientProxyMock } from '../../../../__tests__/__mocks__';
import { of } from 'rxjs';
import { Dna } from '../../core/entities';
import { BusCommandEnum } from '../../core/commands/command.enum';

describe('StatsUseCases', () => {
  let moduleRef: TestingModule;
  let statsUseCases: StatsUseCases;
  let busService: IBusService;

  beforeEach(async () => {
    busService = clientProxyMock();

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IBusService)
      .useValue(busService)
      .compile();

    statsUseCases = moduleRef.get<StatsUseCases>(StatsUseCases);
  });

  describe('get method', () => {
    it('should calc the ratio and return it - more human than mutant', async () => {
      jest.spyOn(busService.client, 'send').mockImplementation(() =>
        of([
          ...Array.from({ length: 40 }).fill({
            dnaSequence: '',
            isMutant: true,
          }),
          ...Array.from({ length: 100 }).fill({
            dnaSequence: '',
            isMutant: false,
          }),
        ] as Dna[]),
      );

      const response = await statsUseCases.get();

      expect(response.humanQuantity).toBe(100);
      expect(response.mutantQuantity).toBe(40);
      expect(response.ratio).toBe(0.4);
      expect(busService.client.send).toHaveBeenCalledWith(
        { cmd: BusCommandEnum.STORAGE_GET_ALL },
        {},
      );
    });

    it('should calc the ratio and return it - more mutant than human', async () => {
      jest.spyOn(busService.client, 'send').mockImplementation(() =>
        of([
          ...Array.from({ length: 500 }).fill({
            dnaSequence: '',
            isMutant: true,
          }),
          ...Array.from({ length: 250 }).fill({
            dnaSequence: '',
            isMutant: false,
          }),
        ] as Dna[]),
      );

      const response = await statsUseCases.get();

      expect(response.humanQuantity).toBe(250);
      expect(response.mutantQuantity).toBe(500);
      expect(response.ratio).toBe(2);
      expect(busService.client.send).toHaveBeenCalledWith(
        { cmd: BusCommandEnum.STORAGE_GET_ALL },
        {},
      );
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
