import { MercuriusDriver } from '@nestjs/mercurius';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { redisStore } from 'cache-manager-redis-store';
import { PartitionAssigners, Partitioners, logLevel } from 'kafkajs';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';

export const config = {
  jwt: {
    access: {
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      // signOptions: { expiresIn: '1200s' },
      signOptions: { expiresIn: '7d' },
    },
    refresh: {
      global: true,
      secret: process.env.JWT_REFRESH_SECRET,
      signOptions: { expiresIn: '7d' },
    },
  },
  cache: {
    isGlobal: true,
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 0,
  } as any,
  kafka: {
    name: process.env.KAFKA_CLIENT_NAME,
    transport: Transport.KAFKA,
    options: {
      producer: {
        createPartitioner: Partitioners.LegacyPartitioner,
        maxInFlightRequests: 10,
        retry: {
          retries: 0,
        },
      },
      client: {
        clientId: process.env.APP_NAME,
        brokers: ['localhost:29092'],
        requestTimeout: 10 * 60 * 1000,
        connectionTimeout: 10 * 60 * 1000,
        logCreator:
          (level) =>
          ({ namespace, level, log }) => {
            if (level === logLevel.ERROR) {
              console.error(`[${namespace}] ${log.message}`);
            }
          },
      },
      consumer: {
        groupId: process.env.CONSUMER_GROUP_NAME,
        partitionAssigners: [PartitionAssigners.roundRobin],
        heartbeatInterval: 30 * 1000,
        sessionTimeout: 10 * 60 * 1000,
        maxInFlightRequests: 10,
        retry: {
          retries: 0,
        },
      },
      run: {
        autoCommit: false,
      },
    },
  } as ClientProviderOptions,
  graphql: {
    driver: MercuriusDriver,
    graphiql: process.env.NODE_ENV !== 'production',
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  },
  winston: {
    levels: {
      alert: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4,
    },
    transports: [
      new transports.DailyRotateFile({
        filename: `../../logs/%DATE%-error.log`,
        level: 'alert',
        format: format.combine(
          format.timestamp({
            format: new Date().toLocaleString('ja-JP', {
              timeZone: 'Asia/Tokyo',
            }),
          }),
          format.printf((info) => {
            return `${info.timestamp} [${info.level}]:${info.message}`;
          }),
        ),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: false,
        maxFiles: '30d',
      }),
      new transports.Console({
        format: format.combine(
          format.cli(),
          format.splat(),
          format.timestamp({
            format: new Date().toLocaleString('ja-JP', {
              timeZone: 'Asia/Tokyo',
            }),
          }),
          format.printf((info) => {
            return `${info.timestamp} [${info.level}]:${info.message}`;
          }),
        ),
      }),
    ],
  },
};
