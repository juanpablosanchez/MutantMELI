import { Module } from '@nestjs/common';
import { BusServicesModule } from '../../services/bus/bus.service';
import { MatrixServicesModule } from '../../services/matrix/matrix.module';
import { MutantUseCases } from './mutant.use-case';

@Module({
  imports: [MatrixServicesModule, BusServicesModule],
  providers: [MutantUseCases],
  exports: [MutantUseCases],
})
export class MutantUseCasesModule {}
