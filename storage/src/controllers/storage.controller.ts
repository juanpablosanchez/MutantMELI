import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IDataServices } from '../core/abstracts';
import { Dna } from '../core/entities';

@Controller()
/* StorageController class es la puerta de entrada al microservicio
para gestionar el almacenamiento de las secuanias de ADN en algún storage permanente*/
export class StorageController {
  constructor(private readonly dataServices: IDataServices) {}

  @MessagePattern({ cmd: 'storage_find_dna' })
  /**
   * Encuentra el ADN ya almacenado de acerdo a una secuencia de ADN.
   * @param {string} dnaSequence - string - Secuencia de ADN a buscar.
   * @returns Promise Retorna ADN almancenado o null en caso contrario.
   */
  async find(dnaSequence: string): Promise<Dna> {
    return this.dataServices.dnaRepository.findDna(dnaSequence);
  }

  @MessagePattern({ cmd: 'storage_get_all' })
  /**
   * Retonar todas las secuencias de ADN almacenadas.
   * @returns Promise Retorna una lista de ADN.
   */
  async getAll(): Promise<Dna[]> {
    return this.dataServices.dnaRepository.getAll();
  }

  @EventPattern({ cmd: 'storage_save' })
  /**
   * Almance una secuencia de ADN.
   * @param {Dna} dna - Dna - Secuencia de ADN a guardar.
   * @returns Promise Retorna ADN almancenado.
   */
  async add(dna: Dna): Promise<Dna> {
    return this.dataServices.dnaRepository.add(dna);
  }
}
