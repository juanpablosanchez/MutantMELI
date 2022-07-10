import { Module } from '@nestjs/common';
import { RedisBusServicesModule } from 'src/frameworks/bus/redis/redis-bus.module';

@Module({
  imports: [RedisBusServicesModule],
  exports: [RedisBusServicesModule],
})
export class BusServicesModule {}
