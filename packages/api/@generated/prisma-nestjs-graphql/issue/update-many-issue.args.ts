import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueUpdateManyMutationInput } from './issue-update-many-mutation.input';
import { Type } from 'class-transformer';
import { IssueWhereInput } from './issue-where.input';

@ArgsType()
export class UpdateManyIssueArgs {

    @Field(() => IssueUpdateManyMutationInput, {nullable:false})
    @Type(() => IssueUpdateManyMutationInput)
    data!: IssueUpdateManyMutationInput;

    @Field(() => IssueWhereInput, {nullable:true})
    @Type(() => IssueWhereInput)
    where?: IssueWhereInput;
}
