import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { IDataServices } from 'src/core/abstracts';
import { Dna } from 'src/core/entities';
import { MatrixService } from 'src/services/matrix/matrix.service';

@Injectable()
export class MutantUseCases {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private readonly dataServices: IDataServices,
    private readonly matrixService: MatrixService,
  ) {}

  async isMutant(dna: Dna): Promise<boolean> {
    const dnaFounded = await this.dataServices.dnaRepository.findDna(
      dna.dnaSequence,
    );

    if (dnaFounded) {
      return dnaFounded.isMutant;
    }

    const isMutant = await this.validateIfIsMutant(dna.dnaSequence);
    const dnaRegister: Dna = { ...dna, isMutant };

    this.dataServices.dnaRepository.add(dnaRegister);

    return isMutant;
  }

  private validateIfIsMutant(dnaSequence: string[]): boolean {
    const sequences = this.matrixService.getCombineSequences(dnaSequence);
    return this.matrixService.validateRepeatedCharacters(
      sequences,
      this.configService.dnaSequences.numberOfRepeatedCharacters,
      this.configService.dnaSequences.numberOfRepeatedSequences,
    );
  }
}
