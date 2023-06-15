import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueCreateInput } from './issue-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneIssueArgs {

    @Field(() => IssueCreateInput, {nullable:false})
    @Type(() => IssueCreateInput)
    data!: IssueCreateInput;
}
