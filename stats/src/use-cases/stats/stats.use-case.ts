import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { Dna, Stats } from '../../core/entities';
import { BusCommandEnum } from '../../core/commands/command.enum';

@Injectable()
/* MutantUseCases class dónde se hace la lógica para analizar el ADN*/
export class StatsUseCases {
  constructor(private readonly busService: IBusService) {}

  /**
   * De acuerdo las secuencias de ADN de humanos y mutantes, se calcula
   * el ratio de mutantes, y se retonar el ratio con la cantidad de humanos y mutantes analizados
   * @returns A Promise con las estadísticas y ratio analizados.
   */
  async get(): Promise<Stats> {
    const dnaList = await firstValueFrom(
      this.busService.client.send<Dna[]>(
        { cmd: BusCommandEnum.STORAGE_GET_ALL },
        {},
      ),
    );

    const mutantQuantity = dnaList.filter((dna) => dna.isMutant).length;
    const humanQuantity = dnaList.length - mutantQuantity;

    const response = new Stats(mutantQuantity, humanQuantity);

    return response;
  }
}
