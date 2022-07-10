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
exports.MutantController = void 0;
const nestjs_1 = require("@automapper/nestjs");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const bus_abstract_1 = require("../core/abstracts/bus.abstract");
const dtos_1 = require("../core/dtos");
const entities_1 = require("../core/entities");
let MutantController = class MutantController {
    constructor(mapper, busServices) {
        this.mapper = mapper;
        this.busServices = busServices;
    }
    async isMutant(res, dnaDto) {
        const requestMapped = this.mapper.map(dnaDto, dtos_1.DnaSequenceDto, entities_1.Dna);
        const isMutantObv$ = this.busServices.client.send({ cmd: 'get_is_mutatant' }, requestMapped);
        const isMutantResponse = await (0, rxjs_1.lastValueFrom)(isMutantObv$);
        if (isMutantResponse) {
            res.status(common_1.HttpStatus.OK).send();
        }
        else {
            res.status(common_1.HttpStatus.FORBIDDEN).send();
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Return true when the DNA is mutant' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.DnaSequenceDto }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.DnaSequenceDto]),
    __metadata("design:returntype", Promise)
], MutantController.prototype, "isMutant", null);
MutantController = __decorate([
    (0, swagger_1.ApiTags)('Mutant'),
    (0, common_1.Controller)('mutant'),
    __param(0, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, bus_abstract_1.IBusServices])
], MutantController);
exports.MutantController = MutantController;
//# sourceMappingURL=mutant.controller.js.map