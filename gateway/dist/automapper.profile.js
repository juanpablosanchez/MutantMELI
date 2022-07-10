"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomapperSetupProfile = void 0;
const common_1 = require("@nestjs/common");
const nestjs_1 = require("@automapper/nestjs");
const core_1 = require("@automapper/core");
const dtos_1 = require("./core/dtos");
const entities_1 = require("./core/entities");
let AutomapperSetupProfile = class AutomapperSetupProfile extends nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, dtos_1.DnaSequenceDto, entities_1.Dna, (0, core_1.forMember)((d) => d.dnaSequence, (0, core_1.mapFrom)((s) => s.dna.toString())));
            (0, core_1.createMap)(mapper, entities_1.Stats, dtos_1.StatsResponseDto, (0, core_1.forMember)((d) => d.count_human_dna, (0, core_1.mapFrom)((s) => s.humanQuantity)), (0, core_1.forMember)((d) => d.count_mutant_dna, (0, core_1.mapFrom)((s) => s.mutantQuantity)));
        };
    }
};
AutomapperSetupProfile = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], AutomapperSetupProfile);
exports.AutomapperSetupProfile = AutomapperSetupProfile;
//# sourceMappingURL=automapper.profile.js.map