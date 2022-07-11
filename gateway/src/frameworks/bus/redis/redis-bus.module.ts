import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import config from '../../../config';
import { IBusService } from '../../../core/abstracts/bus.abstract';
import { RedisBusServices } from './redis-bus.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'REDISBUS',
        inject: [config.KEY],
        useFactory: (
          configService: ConfigType<typeof config>,
        ): ClientProvider => {
          const { connection, password, port } = configService.redis;
          return {
            transport: Transport.REDIS,
            options: {
              url: `redis://${connection}:${port}`,
              password,
            },
          };
        },
      },
    ]),
  ],
  providers: [
    {
      provide: IBusService,
      useClass: RedisBusServices,
    },
  ],
  exports: [IBusService],
})
export class RedisBusServicesModule {}
