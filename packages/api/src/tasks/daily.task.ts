import { PrismaService } from '@/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class DailyTask {
  private readonly logger = new Logger();

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('05 2 * * *')
  handleCron() {
    return false;
  }
}
