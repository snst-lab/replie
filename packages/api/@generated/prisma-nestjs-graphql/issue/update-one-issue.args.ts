import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueUpdateInput } from './issue-update.input';
import { Type } from 'class-transformer';
import { IssueWhereUniqueInput } from './issue-where-unique.input';

@ArgsType()
export class UpdateOneIssueArgs {

    @Field(() => IssueUpdateInput, {nullable:false})
    @Type(() => IssueUpdateInput)
    data!: IssueUpdateInput;

    @Field(() => IssueWhereUniqueInput, {nullable:false})
    @Type(() => IssueWhereUniqueInput)
    where!: IssueWhereUniqueInput;
}
