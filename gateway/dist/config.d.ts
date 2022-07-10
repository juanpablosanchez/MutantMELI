declare const _default: (() => {
    mongo: {
        dbName: string;
        user: string;
        password: string;
        host: string;
        connection: string;
    };
    dnaSequences: {
        numberOfRepeatedCharacters: number;
        numberOfRepeatedSequences: number;
    };
    redis: {
        connection: string;
        port: number;
        password: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    mongo: {
        dbName: string;
        user: string;
        password: string;
        host: string;
        connection: string;
    };
    dnaSequences: {
        numberOfRepeatedCharacters: number;
        numberOfRepeatedSequences: number;
    };
    redis: {
        connection: string;
        port: number;
        password: string;
    };
}>;
export default _default;
