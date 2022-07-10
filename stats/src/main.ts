import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RedisOptions,
  Transport,
} from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const [connection, password, port] = [
    process.env.REDIS_CONNECTION,
    process.env.REDIS_PASSWORD,
    parseInt(process.env.REDIS_PORT, 10),
  ];

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: `redis://${connection}`,
        port,
        password,
      },
    } as RedisOptions,
  );
  await app.listen();
  console.info('Services started');
}
bootstrap();
