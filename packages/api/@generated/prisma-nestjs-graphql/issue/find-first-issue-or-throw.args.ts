import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereInput } from './issue-where.input';
import { Type } from 'class-transformer';
import { IssueOrderByWithRelationInput } from './issue-order-by-with-relation.input';
import { IssueWhereUniqueInput } from './issue-where-unique.input';
import { Int } from '@nestjs/graphql';
import { IssueScalarFieldEnum } from './issue-scalar-field.enum';

@ArgsType()
export class FindFirstIssueOrThrowArgs {

    @Field(() => IssueWhereInput, {nullable:true})
    @Type(() => IssueWhereInput)
    where?: IssueWhereInput;

    @Field(() => [IssueOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<IssueOrderByWithRelationInput>;

    @Field(() => IssueWhereUniqueInput, {nullable:true})
    cursor?: IssueWhereUniqueInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [IssueScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof IssueScalarFieldEnum>;
}
