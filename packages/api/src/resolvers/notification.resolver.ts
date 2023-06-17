import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ErrorService, PrismaService } from '@/services';
import { AuthGuard, GuardResponse } from '@/guards';
import { Response } from '@/types';
import { FindManyNotificationArgs } from '@generated/notification/find-many-notification.args';
import { CreateOneNotificationArgs } from '@generated/notification/create-one-notification.args';
import { constants } from '@constants';

const { notificationsPerPage } = constants.number;

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly error: ErrorService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async findManyNotification(
    @Args() args: FindManyNotificationArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      const response = await this.prisma.notification.findMany({
        ...args,
        where: { AND: [{ userId: user.id }, args.where] },
        take: notificationsPerPage,
        orderBy: { createdAt: 'desc' },
      });
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }

  @Mutation(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async readNotification(
    @Args() args: CreateOneNotificationArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.data?.id) {
        this.error.throw('invalid-parameter');
      }
      const response = await this.prisma.notification.update({
        where: { id: args.data.id },
        data: { unread: false },
      });
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
