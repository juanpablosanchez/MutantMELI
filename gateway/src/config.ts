import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    redis: {
      connection: process.env.REDIS_CONNECTION,
      port: parseInt(process.env.REDIS_PORT, 10),
      password: process.env.REDIS_PASSWORD,
    },
  };
});
