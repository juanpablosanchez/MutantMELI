import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IBusService } from 'src/core/abstracts/bus.abstract';

@Injectable()
export class RedisBusServices implements IBusService, OnApplicationBootstrap {
  client: ClientProxy;

  constructor(@Inject('REDISBUS') private readonly clientProxy: ClientProxy) {}

  onApplicationBootstrap() {
    this.client = this.clientProxy;
  }
}
