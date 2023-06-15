import { Injectable, Query } from '@nestjs/common';
import { Args, ArgsType, Field, Mutation } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService, ErrorService, PrismaService } from '@/services';
import { Response } from '@/types';
import { tools } from '@tools';

@ArgsType()
export class LoginArgs {
  @Field(() => String, { nullable: false })
  authType!: string;

  @Field(() => String, { nullable: false })
  userName!: string;

  @Field(() => String, { nullable: true })
  secret!: string;
}

@Injectable()
export class UserResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly error: ErrorService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Response, { description: '.' })
  async login(@Args() args: LoginArgs) {
    try {
      const { authType, userName, secret } = args;
      if (!authType || !secret) {
        this.error.throw('bad-request');
      }
      const fetched = await this.authService.fetchUser(
        authType,
        userName,
        secret,
      );
      if (!fetched?.userName) {
        this.error.throw('authentication-failed');
      }
      const found = await this.prisma.user.findFirst({
        where: { userName: fetched.userName },
      });
      let user = {} as Auth.User;
      if (!found?.id) {
        user = await this.prisma.user.create({
          data: {
            ...fetched,
            id: tools.random.guid(),
            lastLoginedAt: new Date(),
          },
        });
      } else {
        user = await this.prisma.user.update({
          where: {
            id: found.id,
          },
          data: {
            ...fetched,
            lastLoginedAt: new Date(),
          },
        });
      }
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        username: user.userName,
      });
      if (!accessToken) {
        this.error.throw('session-create-error');
      }
      return { response: user, jwt: { update: true, accessToken } };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
