import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MicroserviceOptions } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { ConsumerModule } from './consumer.module';
import { config } from './config';
import '@includes/prototype';
import '@includes/dayjs';

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      https: {
        key: readFileSync('../../certificate/localhost-key.pem'),
        cert: readFileSync('../../certificate/localhost.pem'),
      },
    }),
  );
  await app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.enableCors();
  await app.listen(4000, '0.0.0.0');

  // const consumer = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   ConsumerModule,
  //   // config.kafka,
  // );
  // await consumer.listen();
})();
