import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereInput } from './issue-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyIssueArgs {

    @Field(() => IssueWhereInput, {nullable:true})
    @Type(() => IssueWhereInput)
    where?: IssueWhereInput;
}
