import type { Mapper } from '@automapper/core';
import { IBusServices } from 'src/core/abstracts/bus.abstract';
import { StatsResponseDto } from 'src/core/dtos';
export declare class StatsController {
    private readonly mapper;
    private readonly busServices;
    constructor(mapper: Mapper, busServices: IBusServices);
    getStats(): Promise<StatsResponseDto>;
}
