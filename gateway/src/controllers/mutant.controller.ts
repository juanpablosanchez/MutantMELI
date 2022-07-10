import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { IBusService } from 'src/core/abstracts/bus.abstract';
import { DnaSequenceDto } from 'src/core/dtos';
import { Dna } from 'src/core/entities';

@ApiTags('Mutant')
@Controller('mutant')
export class MutantController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly busServices: IBusService,
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

    const isMutantResponse = await lastValueFrom(
      this.busServices.client.send<boolean, Dna>(
        { cmd: 'get_is_mutant' },
        requestMapped,
      ),
    );

    if (isMutantResponse) {
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }
}
