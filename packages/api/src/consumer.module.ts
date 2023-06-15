import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ClientsModule } from '@nestjs/microservices';
import { Services } from './services';
import { Consumers } from './consumers';
import { config } from './config';

@Module({
  imports: [
    CacheModule.register(config.cache),
    ClientsModule.register([config.kafka]),
  ],
  controllers: [...Consumers],
  providers: [...Services],
})
export class ConsumerModule {}
