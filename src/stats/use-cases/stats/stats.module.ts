import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { StatsUseCases } from './stats.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [StatsUseCases],
  exports: [StatsUseCases],
})
export class StatsUseCasesModule {}
