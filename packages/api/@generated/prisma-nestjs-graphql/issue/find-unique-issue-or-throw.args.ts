import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereUniqueInput } from './issue-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueIssueOrThrowArgs {

    @Field(() => IssueWhereUniqueInput, {nullable:false})
    @Type(() => IssueWhereUniqueInput)
    where!: IssueWhereUniqueInput;
}
