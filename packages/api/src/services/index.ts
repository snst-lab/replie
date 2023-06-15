export * from './prisma.service';
import { PrismaService } from './prisma.service';
export * from './error.service';
import { ErrorService } from './error.service';
export * from './wallet.service';
import { WalletService } from './wallet.service';
export * from './queue.service';
import { QueueService } from './queue.service';
export * from './gpt.service';
import { GptConsumer, GptService } from './gpt.service';
export * from './auth.service';
import { AuthService } from './auth.service';
export * from './auth/google.service';
import { GoogleService } from './auth/google.service';

export const Services = [
  PrismaService,
  ErrorService,
  WalletService,
  QueueService,
  GptService,
  GptConsumer,
  AuthService,
  GoogleService,
];
