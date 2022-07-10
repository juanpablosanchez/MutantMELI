import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { StorageController } from './controllers/storage.controller';
import { DataServicesModule } from './services/data-services/data-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    DataServicesModule,
  ],
  controllers: [StorageController],
  providers: [],
})
export class AppModule {}
