"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        mongo: {
            dbName: process.env.MONGO_DB,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            password: process.env.MONGO_INITDB_ROOT_PASSWORD,
            host: process.env.MONGO_HOST,
            connection: process.env.MONGO_CONNECTION,
        },
        dnaSequences: {
            numberOfRepeatedCharacters: parseInt(process.env.NUMBER_OF_REPEATED_CHARACTERS, 10),
            numberOfRepeatedSequences: parseInt(process.env.NUMBER_OF_REPEATED_SEQUENCES, 10),
        },
        redis: {
            connection: process.env.REDIS_CONNECTION,
            port: parseInt(process.env.REDIS_PORT, 10),
            password: process.env.REDIS_PASSWORD,
        },
    };
});
//# sourceMappingURL=config.js.map