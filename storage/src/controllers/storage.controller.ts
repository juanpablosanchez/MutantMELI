import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IDataServices } from '../core/abstracts';
import { Dna } from '../core/entities';
import { BusCommandEnum } from '../core/commands/command.enum';

@Controller()
/* StorageController class es la puerta de entrada al microservicio
para gestionar el almacenamiento de las secuanias de ADN en algún storage permanente*/
export class StorageController {
  constructor(private readonly dataServices: IDataServices) {}

  /**
   * Encuentra el ADN ya almacenado de acerdo a una secuencia de ADN.
   * @param {string} dnaSequence - string - Secuencia de ADN a buscar.
   * @returns Promise Retorna ADN almancenado o null en caso contrario.
   */
  @MessagePattern({ cmd: BusCommandEnum.STORAGE_FIND_DNA })
  async find(dnaSequence: string): Promise<Dna> {
    return this.dataServices.dnaRepository.findDna(dnaSequence);
  }

  /**
   * Retonar todas las secuencias de ADN almacenadas.
   * @returns Promise Retorna una lista de ADN.
   */
  @MessagePattern({ cmd: BusCommandEnum.STORAGE_GET_ALL })
  async getAll(): Promise<Dna[]> {
    return this.dataServices.dnaRepository.getAll();
  }

  /**
   * Almance una secuencia de ADN.
   * @param {Dna} dna - Dna - Secuencia de ADN a guardar.
   * @returns Promise Retorna ADN almancenado.
   */
  @EventPattern({ cmd: BusCommandEnum.STORAGE_SAVE })
  async add(dna: Dna): Promise<Dna> {
    return this.dataServices.dnaRepository.add(dna);
  }
}
