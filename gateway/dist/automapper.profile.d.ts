import { AutomapperProfile } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
export declare class AutomapperSetupProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): (mapper: any) => void;
}
