import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { Dna, Stats } from '../../core/entities';

@Injectable()
export class StatsUseCases {
  constructor(private readonly busService: IBusService) {}

  async get(): Promise<Stats> {
    console.info('StatsUseCases => get');
    const dnaList = await firstValueFrom(
      this.busService.client.send<Dna[]>({ cmd: 'storage_get_all' }, {}),
    );
    console.info('storage_get_all');

    const mutantQuantity = dnaList.filter((dna) => dna.isMutant).length;
    const humanQuantity = dnaList.length - mutantQuantity;
    console.info('filters');

    const response: Stats = {
      mutantQuantity,
      humanQuantity,
      ratio: mutantQuantity / humanQuantity,
    };
    console.info('response');

    return response;
  }
}
