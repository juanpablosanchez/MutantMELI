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
exports.StatsController = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const bus_abstract_1 = require("../core/abstracts/bus.abstract");
const dtos_1 = require("../core/dtos");
const entities_1 = require("../core/entities");
let StatsController = class StatsController {
    constructor(mapper, busServices) {
        this.mapper = mapper;
        this.busServices = busServices;
    }
    async getStats() {
        const statsObv$ = this.busServices.client.send({ cmd: 'get_stats' }, null);
        const statsResponse = await (0, rxjs_1.lastValueFrom)(statsObv$);
        return this.mapper.map(statsResponse, entities_1.Stats, dtos_1.StatsResponseDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Return how many mutants and humans have been checked',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.StatsResponseDto }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getStats", null);
StatsController = __decorate([
    (0, swagger_1.ApiTags)('Stats'),
    (0, common_1.Controller)('stats'),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, bus_abstract_1.IBusServices])
], StatsController);
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map