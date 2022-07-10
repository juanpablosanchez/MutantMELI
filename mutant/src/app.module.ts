import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { MutantController } from './controllers/mutant.controller';
import { BusServicesModule } from './services/bus/bus.service';
import { MatrixServicesModule } from './services/matrix/matrix.module';
import { MutantUseCasesModule } from './use-cases/mutant/mutant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    BusServicesModule,
    MatrixServicesModule,
    MutantUseCasesModule,
  ],
  controllers: [MutantController],
  providers: [],
})
export class AppModule {}
