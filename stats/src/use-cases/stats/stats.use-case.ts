import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { Dna, Stats } from '../../core/entities';

@Injectable()
export class StatsUseCases {
  constructor(private readonly busService: IBusService) {}

  async get(): Promise<Stats> {
    const dnaList = await firstValueFrom(
      this.busService.client.send<Dna[]>({ cmd: 'storage_get_all' }, {}),
    );

    const mutantQuantity = dnaList.filter((dna) => dna.isMutant).length;
    const humanQuantity = dnaList.length - mutantQuantity;

    const response = new Stats();
    response.mutantQuantity = mutantQuantity;
    response.humanQuantity = humanQuantity;
    response.ratio = mutantQuantity / humanQuantity;

    return response;
  }
}
