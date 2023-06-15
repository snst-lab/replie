import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ErrorService,
  GptService,
  PrismaService,
  QueueService,
} from '@/services';
import { AuthGuard, GuardResponse } from '@/guards';
import { Response } from '@/types';
import { tools } from '@tools';
import { FindFirstIssueArgs } from '@generated/issue/find-first-issue.args';
import { CreateOneIssueArgs } from '@generated/issue/create-one-issue.args';
import { FindManyIssueArgs } from '@generated/issue/find-many-issue.args';

@Resolver()
export class IssueResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly error: ErrorService,
    private readonly queueService: QueueService,
    private readonly gptService: GptService,
  ) {}

  @Query(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async findIssue(
    @Args() args: FindFirstIssueArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.where?.id) {
        this.error.throw('bad-request');
      }
      const response = await this.prisma.issue.findFirst({
        where: { AND: [{ userId: user.id }, { id: args.where.id }] },
      });
      if (!response?.id) {
        this.error.throw('not-found-issue');
      }
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }

  @Query(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async findManyIssue(
    @Args() args: FindManyIssueArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      const response = await this.prisma.issue.findMany({
        where: { userId: user.id },
        take: 5,
        skip: args?.skip ?? 0,
        orderBy: { updatedAt: 'desc' },
      });
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response, { description: '.' })
  async createIssue(
    @Args() args: CreateOneIssueArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (
        args.data?.id !== 'create' ||
        !args.data?.personId ||
        !args.data?.requestMessage
      ) {
        this.error.throw('bad-request');
      }
      args.data.id = tools.random.guid();
      const response = await this.prisma.issue.create({
        data: {
          ...args.data,
          status: 'pending',
          userId: user.id,
        },
      });
      const message = tools.prompt.issue(
        args.data?.personRelationship ?? '',
        args.data?.personCharacter ?? '',
        args.data?.personRecentStatus ?? '',
        args.data?.personRecentIntimacy ?? '',
        args.data?.requestMessage ?? '',
        args.data?.requestDirection ?? '',
        args.data?.requestLimitLength ?? 0,
      );

      const prisma = this.prisma;

      await this.queueService.send(
        'usePrompt',
        this.gptService.usePrompt,
        {
          message,
        },
        {
          onCompleted: async (result: string) => {
            await prisma.issue.update({
              where: { id: response.id },
              data: {
                status: 'done',
                result,
              },
            });
            await prisma.notification.create({
              data: {
                id: tools.random.guid(),
                userId: user.id,
                personId: args.data.personId,
                title: '新しいアドバイスが届きました',
                message: `次のメッセージへの返事をアドバイスします「${args.data.requestMessage}」`,
                linkTo: `/issues/${response.id}`,
              },
            });
          },
          onFailed: async () => {
            await prisma.issue.update({
              where: { id: response.id },
              data: {
                status: 'failed',
              },
            });
            await prisma.notification.create({
              data: {
                id: tools.random.guid(),
                userId: user.id,
                personId: args.data.personId,
                title: 'アドバイスの作成に失敗しました',
                message: `次のメッセージへのアドバイスの作成に失敗しました。リトライしてみてください。「${args.data.requestMessage}」`,
                linkTo: `/issues/${response.id}`,
              },
            });
          },
        },
      );
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
