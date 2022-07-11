import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Stats } from '../core/entities';
import { StatsUseCases } from '../use-cases';
import { BusCommandEnum } from '../core/commands/command.enum';

@Controller()
/* StatsController class es la puerta de entrada al microservicio para obtener 
el ratio de mutantes vs humanos que se han validado*/
export class StatsController {
  constructor(private readonly statsUseCases: StatsUseCases) {}

  /**
   * Retorna el ratio de mutantes vs humanos que se han validado.
   * Se initializa cuando llega por bus el mensaje get_stats
   * @returns Promise retonar los el ratio.
   */
  @MessagePattern({ cmd: BusCommandEnum.GET_STATS })
  async getStats(): Promise<Stats> {
    return this.statsUseCases.get();
  }
}
