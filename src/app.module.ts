import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutomapperSetupProfile } from './automapper.profile';
import config from './config';
import { MutantController, StatsController } from './controllers';
import { DataServicesModule } from './services/data-services/data-services.module';
import { MutantUseCasesModule } from './use-cases/mutant/mutant.module';
import { StatsUseCasesModule } from './use-cases/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DataServicesModule,
    MutantUseCasesModule,
    StatsUseCasesModule,
  ],
  controllers: [MutantController, StatsController],
  providers: [AutomapperSetupProfile],
})
export class AppModule {}
