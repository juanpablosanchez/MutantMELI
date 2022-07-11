import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Dna } from '../core/entities';
import { MutantUseCases } from '../use-cases';

@Controller()
export class MutantController {
  constructor(private readonly mutantUseCases: MutantUseCases) {}

  @MessagePattern({ cmd: 'get_is_mutant' })
  async getIsMutant(dna: Dna): Promise<boolean> {
    return this.mutantUseCases.isMutant(dna);
  }
}
