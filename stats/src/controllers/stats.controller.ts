import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Stats } from '../core/entities';
import { StatsUseCases } from '../use-cases';

@Controller()
/* StatsController class es la puerta de entrada al microservicio para obtener 
el ratio de mutantes vs humanos que se han validado*/
export class StatsController {
  constructor(private readonly statsUseCases: StatsUseCases) {}

  @MessagePattern({ cmd: 'get_stats' })
  /**
   * Retorna el ratio de mutantes vs humanos que se han validado.
   * Se initializa cuando llega por bus el mensaje get_stats
   * @returns Promise retonar los el ratio.
   */
  async getStats(): Promise<Stats> {
    return this.statsUseCases.get();
  }
}
