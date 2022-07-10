import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class DnaSequenceDto {
  @AutoMap()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ description: 'DNA to validate' })
  dna: string[];
}
