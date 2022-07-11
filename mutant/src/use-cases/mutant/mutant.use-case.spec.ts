import { MutantUseCases } from './mutant.use-case';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MatrixService } from '../../services/matrix/matrix.service';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { clientProxyMock } from '../../../../__tests__/__mocks__';
import { of } from 'rxjs';

describe('MutantUseCases', () => {
  let moduleRef: TestingModule;
  let mutantUseCases: MutantUseCases;
  let busService: IBusService;
  let matrixService;

  beforeEach(async () => {
    matrixService = {
      getCombineSequences: () => [],
      validateRepeatedCharacters: () => true,
    };
    busService = clientProxyMock();

    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MatrixService)
      .useValue(matrixService)
      .overrideProvider(IBusService)
      .useValue(busService)
      .compile();

    mutantUseCases = moduleRef.get<MutantUseCases>(MutantUseCases);
  });

  describe('isMutant method', () => {
    it('should validate DNA and call matrix service', async () => {
      jest.spyOn(busService.client, 'emit');
      jest.spyOn(busService.client, 'send').mockImplementation(() => of(null));
      jest.spyOn(matrixService, 'getCombineSequences').mockResolvedValue([]);
      jest
        .spyOn(matrixService, 'validateRepeatedCharacters')
        .mockResolvedValue(true);

      const response = await mutantUseCases.isMutant({
        dnaSequence: 'ABCDE,ABCDE',
        isMutant: false,
      });

      expect(response).toBe(true);
      expect(matrixService.getCombineSequences).toHaveBeenCalledTimes(1);
      expect(matrixService.validateRepeatedCharacters).toHaveBeenCalledTimes(1);
      expect(busService.client.emit).toHaveBeenCalledWith(
        { cmd: 'storage_save' },
        { dnaSequence: 'ABCDE,ABCDE', isMutant: true },
      );
      expect(busService.client.send).toHaveBeenCalledWith(
        { cmd: 'storage_find_dna' },
        'ABCDE,ABCDE',
      );
    });

    it('should search in storage and return value', async () => {
      jest.spyOn(busService.client, 'emit');
      jest
        .spyOn(busService.client, 'send')
        .mockImplementation(() =>
          of({ dnaSequence: 'ABCDE,ABCDE', isMutant: true }),
        );
      jest.spyOn(matrixService, 'getCombineSequences').mockResolvedValue([]);
      jest
        .spyOn(matrixService, 'validateRepeatedCharacters')
        .mockResolvedValue(true);

      const response = await mutantUseCases.isMutant({
        dnaSequence: 'ABCDE,ABCDE',
        isMutant: false,
      });

      expect(response).toBe(true);
      expect(matrixService.getCombineSequences).not.toHaveBeenCalled();
      expect(matrixService.validateRepeatedCharacters).not.toHaveBeenCalled();
      expect(busService.client.emit).not.toHaveBeenCalled();
      expect(busService.client.send).toHaveBeenCalledWith(
        { cmd: 'storage_find_dna' },
        'ABCDE,ABCDE',
      );
    });

    it('should search in memory and return value', async () => {
      jest.spyOn(busService.client, 'emit');
      jest
        .spyOn(busService.client, 'send')
        .mockImplementation(() =>
          of({ dnaSequence: 'ABCDE,ABCDE', isMutant: true }),
        );
      jest.spyOn(matrixService, 'getCombineSequences').mockResolvedValue([]);
      jest
        .spyOn(matrixService, 'validateRepeatedCharacters')
        .mockResolvedValue(true);

      await mutantUseCases.isMutant({
        dnaSequence: 'ABCDE,ABCDE',
        isMutant: false,
      });
      const response = await mutantUseCases.isMutant({
        dnaSequence: 'ABCDE,ABCDE',
        isMutant: false,
      });

      expect(response).toBe(true);
      expect(matrixService.getCombineSequences).not.toHaveBeenCalled();
      expect(matrixService.validateRepeatedCharacters).not.toHaveBeenCalled();
      expect(busService.client.emit).not.toHaveBeenCalled();
      expect(busService.client.send).toHaveBeenCalledTimes(1);
      expect(busService.client.send).toHaveBeenCalledWith(
        { cmd: 'storage_find_dna' },
        'ABCDE,ABCDE',
      );
    });
  });

  afterEach(() => {
    moduleRef.close();
  });
});
