import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AutomapperSetupProfile } from './automapper.profile';
import config from './config';
import { MutantController, StatsController } from './controllers';
import { BusServicesModule } from './services/bus/bus.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    BusServicesModule,
  ],
  controllers: [MutantController, StatsController],
  providers: [AutomapperSetupProfile],
})
export class AppModule {}
