import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Stats } from 'src/core/entities';
import { StatsUseCases } from 'src/use-cases';

@Controller()
export class StatsController {
  constructor(private readonly statsUseCases: StatsUseCases) {}

  @MessagePattern({ cmd: 'get_stats' })
  async getIsMutant(): Promise<Stats> {
    return this.statsUseCases.get();
  }
}
