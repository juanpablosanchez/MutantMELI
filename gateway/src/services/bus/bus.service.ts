import { Module } from '@nestjs/common';
import { RedisBusServicesModule } from '../../frameworks/bus/redis/redis-bus.module';

@Module({
  imports: [RedisBusServicesModule],
  exports: [RedisBusServicesModule],
})
export class BusServicesModule {}
