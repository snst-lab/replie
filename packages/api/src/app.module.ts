import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MercuriusDriverConfig } from '@nestjs/mercurius';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bull';
import { WinstonModule } from 'nest-winston';
import { Services } from './services';
import { Tasks } from './tasks';
import { Resolvers } from './resolvers';
import { LogMiddleware } from './middleware';
import { config } from './config';

@Module({
  imports: [
    // ClientsModule.register([config.kafka])
    BullModule.forRoot({
      redis: config.cache,
    }),
    BullModule.registerQueue({
      name: 'queue',
    }),
    CacheModule.register(config.cache),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<MercuriusDriverConfig>(config.graphql),
    WinstonModule.forRoot(config.winston),
    JwtModule.register(config.jwt.access),
  ],
  controllers: [],
  providers: [...Services, ...Resolvers, ...Tasks],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
