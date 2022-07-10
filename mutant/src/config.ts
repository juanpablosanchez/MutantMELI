import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    dnaSequences: {
      numberOfRepeatedCharacters: parseInt(
        process.env.NUMBER_OF_REPEATED_CHARACTERS,
        10,
      ),
      numberOfRepeatedSequences: parseInt(
        process.env.NUMBER_OF_REPEATED_SEQUENCES,
        10,
      ),
    },
    redis: {
      connection: process.env.REDIS_CONNECTION,
      port: parseInt(process.env.REDIS_PORT, 10),
      password: process.env.REDIS_PASSWORD,
    },
  };
});
