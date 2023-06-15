import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereUniqueInput } from './issue-where-unique.input';
import { Type } from 'class-transformer';
import { IssueCreateInput } from './issue-create.input';
import { IssueUpdateInput } from './issue-update.input';

@ArgsType()
export class UpsertOneIssueArgs {

    @Field(() => IssueWhereUniqueInput, {nullable:false})
    @Type(() => IssueWhereUniqueInput)
    where!: IssueWhereUniqueInput;

    @Field(() => IssueCreateInput, {nullable:false})
    @Type(() => IssueCreateInput)
    create!: IssueCreateInput;

    @Field(() => IssueUpdateInput, {nullable:false})
    @Type(() => IssueUpdateInput)
    update!: IssueUpdateInput;
}
