import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { IBusService } from '../core/abstracts/bus.abstract';
import { StatsResponseDto } from '../core/dtos';
import { Stats } from '../core/entities';

@ApiTags('Stats')
@Controller('stats')
export class StatsController {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly busServices: IBusService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Return how many mutants and humans have been checked',
  })
  @ApiResponse({ type: StatsResponseDto })
  async getStats(): Promise<StatsResponseDto> {
    const statsObv$ = this.busServices.client.send<Stats>(
      { cmd: 'get_stats' },
      {},
    );
    const statsResponse = await lastValueFrom(statsObv$);
    return this.mapper.map(statsResponse, Stats, StatsResponseDto);
  }
}
