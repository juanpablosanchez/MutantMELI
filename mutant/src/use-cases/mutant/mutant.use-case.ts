import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import config from '../../config';
import { IBusService } from '../../core/abstracts/bus.abstract';
import { Dna } from '../../core/entities';
import { MatrixService } from '../../services/matrix/matrix.service';
import { MemoryService } from '../../services/memory/memory.service';
import { BusCommandEnum } from '../../core/commands/command.enum';

@Injectable()
/* MutantUseCases class dónde se hace la lógica para analizar el ADN*/
export class MutantUseCases {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly matrixService: MatrixService,
    private readonly memoryService: MemoryService,
    private readonly busServices: IBusService,
  ) {}

  /**
   * Retorna si la secuencia de AND es mutante o no
   * además de mandar al bus la secuencia de ADN para su almecenamiento
   * @param {Dna} dna - AND
   * @returns boolean, si es mutante o no.
   */
  async isMutant(dna: Dna): Promise<boolean> {
    const dnaFounded = await this.getIsMutantFromStorage(dna);

    if (typeof dnaFounded === 'boolean') {
      return dnaFounded;
    }

    const isMutant = await this.validateIfIsMutant(dna.dnaSequence);
    const dnaRegister: Dna = { ...dna, isMutant };

    this.memoryService.addDna(dnaRegister);
    this.busServices.client.emit<void, Dna>(
      { cmd: BusCommandEnum.STORAGE_SAVE },
      dnaRegister,
    );

    return isMutant;
  }

  /**
   * Llama al servicio matrixService, para determinar si es mutante o no
   * @param {string} dnaSequence - string: Secuancia de AND a ser validada.
   * @returns boolean, si es mutante o no.
   */
  private validateIfIsMutant(dnaSequence: string): boolean {
    const sequences = this.matrixService.getCombineSequences(
      dnaSequence.split(','),
    );
    return this.matrixService.validateRepeatedCharacters(
      sequences,
      this.configService.dnaSequences.numberOfRepeatedCharacters,
      this.configService.dnaSequences.numberOfRepeatedSequences,
    );
  }

  /**
   * Busca si la secuencia de ADN ya fue analizada con anterioridad
   * busca primero en memoria, sino llama al microservicio de storage para buscarla
   * @param {Dna} dna - ADN - Secuancia de AND a ser validada
   * @returns Promesa, null si no fue encontrada, o boolean si fue encontrada.
   */
  private async getIsMutantFromStorage(dna: Dna): Promise<boolean | null> {
    const dnaFromLocalMemory = this.memoryService.getIsMutant(dna.dnaSequence);

    if (typeof dnaFromLocalMemory === 'boolean') {
      return dnaFromLocalMemory;
    }

    const dnaFounded = await firstValueFrom(
      this.busServices.client.send<Dna | null, string>(
        { cmd: BusCommandEnum.STORAGE_FIND_DNA },
        dna.dnaSequence,
      ),
    );

    if (dnaFounded) {
      this.memoryService.addDna(dnaFounded);
      return dnaFounded.isMutant;
    }

    return null;
  }
}
