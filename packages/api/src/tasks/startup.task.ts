import { QueueService } from '@/services';
import { Injectable, Logger } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class StartupTask {
  private readonly logger = new Logger();

  constructor(private readonly queueService: QueueService) {}

  @Timeout(500)
  async initQueueService() {
    await this.queueService.init();
  }

  @Timeout(1000)
  async initExceptionHandler() {
    process.on('uncaughtException', async (error) => {
      const message = `[Uncaught Exception] ${error.message}`;
      try {
        await this.logger.log({
          level: 'alert',
          message,
        });
        process.exit(1);
      } catch {
        process.exit(1);
      }
    });
    process.on('unhandledRejection', async (reason, place) => {
      const message = `[Unhandled Rejection] at:${await place} reason:${reason}`;
      try {
        await this.logger.log({
          level: 'alert',
          message,
        });
        process.exit(1);
      } catch {
        process.exit(1);
      }
    });
  }
}
