import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class StatsResponseDto {
  @AutoMap()
  @ApiProperty({ description: 'Quantity of mutants' })
  count_mutant_dna: number;

  @AutoMap()
  @ApiProperty({ description: 'Quantity of human' })
  count_human_dna: number;

  @AutoMap()
  @ApiProperty({ description: 'Ratio of mutants' })
  ratio: number;
}
