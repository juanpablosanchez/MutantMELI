import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { IDataServices } from '../core/abstracts';
import { Dna } from '../core/entities';

@Controller()
export class StorageController {
  constructor(private readonly dataServices: IDataServices) {}

  @MessagePattern({ cmd: 'storage_find_dna' })
  async find(dnaSequence: string): Promise<Dna> {
    return this.dataServices.dnaRepository.findDna(dnaSequence);
  }

  @MessagePattern({ cmd: 'storage_get_all' })
  async getAll(): Promise<Dna[]> {
    return this.dataServices.dnaRepository.getAll();
  }

  @EventPattern({ cmd: 'storage_save' })
  async add(dna: Dna): Promise<Dna> {
    return this.dataServices.dnaRepository.add(dna);
  }
}
