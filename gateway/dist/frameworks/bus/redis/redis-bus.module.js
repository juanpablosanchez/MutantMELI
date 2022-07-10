"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisBusServicesModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../../../config");
const bus_abstract_1 = require("../../../core/abstracts/bus.abstract");
const redis_bus_service_1 = require("./redis-bus.service");
let RedisBusServicesModule = class RedisBusServicesModule {
};
RedisBusServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'REDISBUS',
                    inject: [config_1.default.KEY],
                    useFactory: (configService) => {
                        const { connection, password, port } = configService.redis;
                        return {
                            transport: microservices_1.Transport.REDIS,
                            options: {
                                url: `redis://${connection}`,
                                port,
                                password,
                            },
                        };
                    },
                },
            ]),
        ],
        providers: [
            {
                provide: bus_abstract_1.IBusServices,
                useClass: redis_bus_service_1.RedisBusServices,
            },
        ],
        exports: [bus_abstract_1.IBusServices],
    })
], RedisBusServicesModule);
exports.RedisBusServicesModule = RedisBusServicesModule;
//# sourceMappingURL=redis-bus.module.js.map