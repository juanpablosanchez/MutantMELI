import { Module } from '@nestjs/common';
import { DataServicesModule } from 'src/services/data-services/data-services.module';
import { MatrixServicesModule } from 'src/services/matrix/matrix.module';
import { MutantUseCases } from './mutant.use-case';

@Module({
  imports: [DataServicesModule, MatrixServicesModule],
  providers: [MutantUseCases],
  exports: [MutantUseCases],
})
export class MutantUseCasesModule {}
