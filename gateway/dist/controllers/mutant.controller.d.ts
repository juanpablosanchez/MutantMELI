import type { Mapper } from '@automapper/core';
import { Response } from 'express';
import { IBusServices } from 'src/core/abstracts/bus.abstract';
import { DnaSequenceDto } from 'src/core/dtos';
export declare class MutantController {
    private readonly mapper;
    private readonly busServices;
    constructor(mapper: Mapper, busServices: IBusServices);
    isMutant(res: Response, dnaDto: DnaSequenceDto): Promise<void>;
}
