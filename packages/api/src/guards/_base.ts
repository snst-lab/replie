import {
  CanActivate,
  ExecutionContext,
  Injectable,
  createParamDecorator,
} from '@nestjs/common';
import { decycle } from 'json-cyclic';

@Injectable()
export abstract class BaseGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = await this.handleRequest(context);
    const request = context.switchToHttp().getRequest();
    request['guard'] = request['guard'] ?? {};
    Object.assign(request['guard'], data);

    return !!data;
  }

  abstract handleRequest(context: ExecutionContext): any;
}

export const GuardResponse = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const data = decycle(request['guard']);

    return property ? data?.[property] : data;
  },
);
