import { Injectable } from '@nestjs/common';
import { Dna } from '../../core/entities';

@Injectable()
export class MemoryService {
  private localMemory: { [dna: string]: boolean } = {};

  /**
   * SI encuentra la secuencia de AND retorna si es mutante, sino la encuentra retorna null
   * @param {string} sequenceDna - string - secuencia de ADN a validar.
   * @returns Si es mutante o null si no se encuentra el ADN.
   */
  getIsMutant(sequenceDna: string): boolean | null {
    return this.localMemory[sequenceDna] ?? null;
  }

  /**
   * Agrega el ADN a memoria.
   * @param {Dna} dna - Dna - ADN a agregar
   */
  addDna(dna: Dna): void {
    this.localMemory[dna.dnaSequence] = dna.isMutant;
  }
}
