import { Module } from '@nestjs/common';
import { BusServicesModule } from '../../services/bus/bus.service';
import { StatsUseCases } from './stats.use-case';

@Module({
  imports: [BusServicesModule],
  providers: [StatsUseCases],
  exports: [StatsUseCases],
})
export class StatsUseCasesModule {}
