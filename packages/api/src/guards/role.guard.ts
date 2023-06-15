import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BaseGuard } from './_base';

@Injectable()
export class RoleGuard extends BaseGuard {
  constructor() {
    super();
  }

  async handleRequest(context: ExecutionContext): Promise<Json> {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx;
  }
}
