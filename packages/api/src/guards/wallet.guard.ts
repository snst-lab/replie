import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorService, WalletService } from '@/services';
import { BaseGuard } from './_base';

@Injectable()
export class WalletGuard extends BaseGuard {
  constructor(
    private readonly error: ErrorService,
    private readonly walletService: WalletService,
  ) {
    super();
  }
  async handleRequest(context: ExecutionContext): Promise<any> {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const { wallet } = ctx.req.body.variables;
      if (!wallet) {
        this.error.throw('invalid-parameter');
      }
      const { message, address, signature } = wallet;
      if (!message || !address || !signature) {
        this.error.throw('invalid-parameter');
      }
      const verified = await this.walletService.verifySignature({
        message,
        address,
        signature,
      });
      return { wallet: verified };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
