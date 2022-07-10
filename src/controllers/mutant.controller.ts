import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DnaSequenceDto } from 'src/core/dtos';
import { Dna } from 'src/core/entities';
import { MutantUseCases } from 'src/use-cases';

@ApiTags('Mutant')
@Controller('mutant')
export class MutantController {
  constructor(
    private readonly mutantUseCases: MutantUseCases,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Return true when the DNA is mutant' })
  @ApiBody({ type: DnaSequenceDto })
  @ApiResponse({ status: HttpStatus.OK })
  async isMutant(
    @Res() res: Response,
    @Body() dnaDto: DnaSequenceDto,
  ): Promise<void> {
    const requestMapped = this.mapper.map(dnaDto, DnaSequenceDto, Dna);
    const isMutant = await this.mutantUseCases.isMutant(requestMapped);

    if (isMutant) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }
}
