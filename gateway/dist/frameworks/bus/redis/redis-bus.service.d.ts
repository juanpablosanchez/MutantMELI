import { OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IBusServices } from 'src/core/abstracts/bus.abstract';
export declare class RedisBusServices implements IBusServices, OnApplicationBootstrap {
    private readonly clientProxy;
    client: ClientProxy;
    constructor(clientProxy: ClientProxy);
    onApplicationBootstrap(): void;
}
