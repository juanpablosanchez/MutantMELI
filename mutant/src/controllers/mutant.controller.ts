import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Dna } from '../core/entities';
import { MutantUseCases } from '../use-cases';

@Controller()
/* MutantController class es la puerta de entrada al microservicio para saber 
si la secuencia de ADN es de un mutante o no*/
export class MutantController {
  constructor(private readonly mutantUseCases: MutantUseCases) {}

  @MessagePattern({ cmd: 'get_is_mutant' })
  /**
   * Determina si el AND es mutante o no.
   * Se initializa cuando llega por bus el mensaje get_is_mutant
   * @param {Dna} dna - Dna
   * @returns Promise retornando si es mutante o no.
   */
  async getIsMutant(dna: Dna): Promise<boolean> {
    return this.mutantUseCases.isMutant(dna);
  }
}
