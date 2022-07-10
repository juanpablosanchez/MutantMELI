import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModule,
  RedisOptions,
  Transport,
} from '@nestjs/microservices';
import config from 'src/config';
import { IBusService } from 'src/core/abstracts/bus.abstract';
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
              url: `redis://${connection}`,
              port,
              password,
            },
          } as RedisOptions;
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
