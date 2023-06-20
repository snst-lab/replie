import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ErrorService, PrismaService } from '@/services';
import { AuthGuard, GuardResponse } from '@/guards';
import { Response } from '@/types';
import { CreateOnePersonArgs } from '@generated/person/create-one-person.args';
import { FindFirstPersonArgs } from '@generated/person/find-first-person.args';
import { FindManyPersonArgs } from '@generated/person/find-many-person.args';
import { tools } from '@tools';

@Resolver()
export class PersonResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly error: ErrorService,
  ) {}

  @Query(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async findPerson(
    @Args() args: FindFirstPersonArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.where?.id) {
        this.error.throw('invalid-parameter');
      }
      const response = await this.prisma.person.findFirst({
        where: { AND: [{ userId: user.id }, { id: args.where.id }] },
      });
      if (!response?.id) {
        this.error.throw('not-found-person');
      }
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }

  @Query(() => Response, { description: '.' })
  @UseGuards(AuthGuard)
  async findManyPerson(
    @Args() args: FindManyPersonArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      const response = await this.prisma.person.findMany({
        where: {
          AND: [{ userId: user.id }, args.where],
        },
        orderBy: { updatedAt: 'desc' },
      });
      return { response, jwt };
    } catch (error) {
      this.error.catch(error);
    }
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Response, { description: '.' })
  async upsertPerson(
    @Args() args: CreateOnePersonArgs,
    @GuardResponse() { user, jwt }: Auth.GuardResponse,
  ) {
    try {
      if (!args.data?.id || !args.data?.name || !args.data?.relationship) {
        this.error.throw('invalid-parameter');
      }
      if (args.data.id === 'create') {
        args.data.id = tools.random.guid();
        const response = await this.prisma.person.create({
          data: {
            ...args.data,
            userId: user.id,
          },
        });
        return { response };
      } else {
        const found = await this.prisma.person.findFirst({
          where: {
            AND: [{ userId: user.id }, { id: args.data.id }],
          },
        });
        if (!found?.id) {
          this.error.throw('not-found-person');
        }
        const response = await this.prisma.person.update({
          where: { id: found.id },
          data: args.data,
        });
        return { response, jwt };
      }
    } catch (error) {
      this.error.catch(error);
    }
  }
}
