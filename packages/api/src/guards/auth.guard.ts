import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService, ErrorService, AuthService } from '@/services';
import { BaseGuard } from './_base';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard extends BaseGuard {
  constructor(
    private readonly prisma: PrismaService,
    private readonly error: ErrorService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async handleRequest(context: ExecutionContext): Promise<Auth.GuardResponse> {
    try {
      const ctx = GqlExecutionContext.create(context).getContext();
      const auth: Auth.Variables = ctx.req.body.variables.auth;
      if (!auth) {
        this.error.throw('session-expired');
      }
      const { authType, userName, accessToken, socialAccessToken } = auth;
      if (!authType || !userName || !accessToken || !socialAccessToken) {
        this.error.throw('session-expired');
      }
      const found = await this.prisma.user.findFirst({
        where: {
          authType: authType,
          userName: userName,
        },
      });
      if (!found?.id) {
        this.error.throw('not-found-user');
      }

      const verified = await this.jwtService
        .verifyAsync(accessToken, {
          secret: process.env.JWT_ACCESS_SECRET,
        })
        .then(() => {
          return {
            user: found,
            jwt: {
              update: false,
              accessToken: null,
            },
          };
        })
        .catch(async () => {
          const fetched = await this.authService.fetchUser(
            authType,
            userName,
            socialAccessToken,
          );
          if (!fetched?.userName) {
            this.error.throw('authentication-failed');
          }
          const accessToken = await this.jwtService.signAsync({
            sub: found.id,
            username: fetched.userName,
          });
          if (!accessToken) {
            this.error.throw('session-create-error');
          }
          return {
            user: found,
            jwt: {
              update: true,
              accessToken,
            },
          };
        });
      return verified;
    } catch (error) {
      this.error.catch(error);
    }
  }
}
