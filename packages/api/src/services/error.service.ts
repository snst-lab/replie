import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';
import { constants } from '@constants';

const { error } = constants;

type CustomErrorProps = {
  message: string;
  extensions: GraphQLErrorExtensions;
};

export class CustomError extends GraphQLError {
  extensions: GraphQLErrorExtensions;

  constructor({ message, extensions }: CustomErrorProps) {
    super(message);
    this.extensions = extensions;
  }
}

@Injectable()
export class ErrorService {
  private readonly logger: LoggerService = new Logger();

  throw(code: Error.Code, message?: string) {
    if (!error[code]) {
      code = 'unknown';
      message = message || error[code].message;
    } else {
      message = error[code].message;
    }
    throw new CustomError({
      message,
      extensions: {
        code,
        status: error[code].status,
        logLevel: error[code].logLevel,
      },
    });
  }

  catch(error: CustomError) {
    if (error.extensions) {
      switch (error.extensions.logLevel as keyof LoggerService) {
        case 'error':
          this.logger.log({
            level: 'alert',
            message: error.message,
          });
          break;
        case 'warn':
          this.logger.warn(error.message);
          break;
        case 'debug':
          this.logger.debug(error.message);
          break;
        default:
          this.logger.log(error.message);
      }
    } else {
      this.logger.log({
        level: 'alert',
        message: error.message,
      });
    }
    throw error;
  }
}
