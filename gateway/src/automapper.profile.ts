import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, mapFrom } from '@automapper/core';
import type { Mapper } from '@automapper/core';
import { DnaSequenceDto, StatsResponseDto } from './core/dtos';
import { Dna, Stats } from './core/entities';

@Injectable()
export class AutomapperSetupProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  /**
   * Configuración de los mappers
   * @returns Retorna una función con los diferentes mappers configurados
   */
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        DnaSequenceDto,
        Dna,
        forMember(
          (d) => d.dnaSequence,
          mapFrom((s) => s.dna.toString()),
        ),
      );

      createMap(
        mapper,
        Stats,
        StatsResponseDto,
        forMember(
          (d) => d.count_human_dna,
          mapFrom((s) => s.humanQuantity),
        ),
        forMember(
          (d) => d.count_mutant_dna,
          mapFrom((s) => s.mutantQuantity),
        ),
      );
    };
  }
}
