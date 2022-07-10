import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { StatsController } from './controllers/stats.controller';
import { BusServicesModule } from './services/bus/bus.service';
import { StatsUseCasesModule } from './use-cases/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    BusServicesModule,
    StatsUseCasesModule,
  ],
  controllers: [StatsController],
  providers: [],
})
export class AppModule {}
