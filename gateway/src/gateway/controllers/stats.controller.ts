import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatsResponseDto } from 'src/core/dtos';
import { Stats } from 'src/core/entities';
import { StatsUseCases } from 'src/use-cases';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(
    private readonly statsUseCases: StatsUseCases,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Return how many mutants and humans have been checked',
  })
  @ApiResponse({ type: StatsResponseDto })
  async getStats(): Promise<StatsResponseDto> {
    const response = await this.statsUseCases.get();
    return this.mapper.map(response, Stats, StatsResponseDto);
  }
}
