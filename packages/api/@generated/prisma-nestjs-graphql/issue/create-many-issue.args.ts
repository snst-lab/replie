import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueCreateManyInput } from './issue-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyIssueArgs {

    @Field(() => [IssueCreateManyInput], {nullable:false})
    @Type(() => IssueCreateManyInput)
    data!: Array<IssueCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
