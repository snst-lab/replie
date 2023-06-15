import { Injectable } from '@nestjs/common';
import { Field, Args, ArgsType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { ErrorService } from '@/services';

@ArgsType()
export class WalletVerifySignatureArgs {
  @Field(() => String, { nullable: false })
  message!: string;

  @Field(() => String, { nullable: false })
  address!: string;

  @Field(() => String, { nullable: false })
  signature!: string;
}

@Injectable()
export class WalletService {
  constructor(private readonly error: ErrorService) {}

  async verifySignature(
    @Args() args: WalletVerifySignatureArgs,
  ): Promise<WalletVerifySignatureArgs | null> {
    try {
      const { message, address: expected, signature } = args;
      const digest = ethers.utils.hashMessage(message);
      const actual = ethers.utils.recoverAddress(digest, signature);
      if (actual !== expected) {
        this.error.throw('invalid-signature');
      }
      return {
        message,
        address: expected,
        signature,
      };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
