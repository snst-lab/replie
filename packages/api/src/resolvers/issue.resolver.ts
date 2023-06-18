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
import { FindManyIssueArgs } from '@generated/issue/find-many-issue.args';
import { CreateOneIssueArgs } from '@generated/issue/create-one-issue.args';
import { DeleteOneIssueArgs } from '@generated/issue/delete-one-issue.args';
import { constants } from '@constants';

const { issuesPerPage } = constants.number;

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
        this.error.throw('invalid-parameter');
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
        take: issuesPerPage,
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
  async upsertIssue(
    @Args() args: CreateOneIssueArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.data?.id) {
        this.error.throw('invalid-parameter');
      }
      let response = {} as Json;
      if (args.data.id === 'create') {
        response = await this.prisma.issue.create({
          data: {
            ...args.data,
            id: tools.random.guid(),
            userId: user.id,
          },
        });
      } else {
        response = await this.prisma.issue.findFirst({
          where: { id: args.data.id },
        });
      }
      if (!response?.id) {
        this.error.throw('not-found-issue');
      }
      await this.prisma.issue.update({
        where: { id: response.id },
        data: {
          status: 'pending',
        },
      });

      const message = tools.prompt.issue(
        response?.personRelationship ?? '',
        response?.personCharacter ?? '',
        response?.personRecentStatus ?? '',
        response?.personRecentIntimacy ?? '',
        response?.requestMessage ?? '',
        response?.requestDirection ?? '',
        response?.requestLimitLength ?? 0,
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
                personId: response.personId,
                title: '新しいアドバイスが届きました',
                message: `次のメッセージへのアドバイス「${response.requestMessage}」`,
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
                personId: response.personId,
                title: 'アドバイスの作成に失敗しました',
                message: `次のメッセージへのアドバイス「${response.requestMessage}」`,
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

  @Mutation(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async deleteIssue(
    @Args() args: DeleteOneIssueArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.where?.id) {
        this.error.throw('invalid-parameter');
      }
      const response = await this.prisma.issue.findFirst({
        where: { AND: [{ userId: user.id }, { id: args.where.id }] },
      });
      if (!response?.id) {
        this.error.throw('not-found-issue');
      }
      await this.prisma.issue.delete({
        where: { id: args.where.id },
      });
      return { response: true, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }
}
