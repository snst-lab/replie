import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    const statusCode = res.statusCode;
    if (statusCode === 401 || statusCode === 405) {
      // this.logger.log({
      //   level: 'alert',
      //   message: `[${req.method}] ${req.url} - ${statusCode}`,
      // });
    }
    next();
  }
}
