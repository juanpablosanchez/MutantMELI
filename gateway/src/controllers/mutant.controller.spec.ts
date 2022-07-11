import { MutantController } from './';
import { IBusService } from '../core/abstracts/bus.abstract';
import { of } from 'rxjs';
import { Response } from 'express';
import { resParamMock, clientProxyMock } from '../../../__tests__/__mocks__';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('MutantController', () => {
  let mutantController: MutantController;
  let resParam: Response;
  let busServices: IBusService;

  beforeEach(async () => {
    resParam = resParamMock();
    busServices = clientProxyMock();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(IBusService)
      .useValue(busServices)
      .compile();

    mutantController = moduleRef.get<MutantController>(MutantController);
  });

  describe('isMutant method', () => {
    it('should return OK when is mutant', async () => {
      jest.spyOn(busServices.client, 'send').mockImplementation(() => of(true));
      jest.spyOn(resParam, 'status');

      await mutantController.isMutant(resParam, { dna: ['ABCDE', 'ABCDE'] });

      expect(resParam.status).toHaveBeenCalledWith(200);
      expect(busServices.client.send).toHaveBeenCalledWith(
        { cmd: 'get_is_mutant' },
        { dnaSequence: 'ABCDE,ABCDE' },
      );
    });

    it('should return Forbidden when is not mutant', async () => {
      jest
        .spyOn(busServices.client, 'send')
        .mockImplementation(() => of(false));
      jest.spyOn(resParam, 'status');

      await mutantController.isMutant(resParam, { dna: ['ABCDE', 'ABCDE'] });

      expect(resParam.status).toHaveBeenCalledWith(403);
      expect(busServices.client.send).toHaveBeenCalledWith(
        { cmd: 'get_is_mutant' },
        { dnaSequence: 'ABCDE,ABCDE' },
      );
    });
  });
});
