import { Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts';
import { Stats } from 'src/core/entities';

@Injectable()
export class StatsUseCases {
  constructor(private readonly dataServices: IDataServices) {}

  async get(): Promise<Stats> {
    const dnaList = await this.dataServices.dnaRepository.getAll();

    const mutantQuantity = dnaList.filter((dna) => dna.isMutant).length;
    const humanQuantity = dnaList.length - mutantQuantity;

    const response: Stats = {
      mutantQuantity,
      humanQuantity,
      ratio: mutantQuantity / humanQuantity,
    };

    return response;
  }
}
