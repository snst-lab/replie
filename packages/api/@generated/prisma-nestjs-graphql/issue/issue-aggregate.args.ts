import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereInput } from './issue-where.input';
import { Type } from 'class-transformer';
import { IssueOrderByWithRelationInput } from './issue-order-by-with-relation.input';
import { IssueWhereUniqueInput } from './issue-where-unique.input';
import { Int } from '@nestjs/graphql';
import { IssueCountAggregateInput } from './issue-count-aggregate.input';
import { IssueAvgAggregateInput } from './issue-avg-aggregate.input';
import { IssueSumAggregateInput } from './issue-sum-aggregate.input';
import { IssueMinAggregateInput } from './issue-min-aggregate.input';
import { IssueMaxAggregateInput } from './issue-max-aggregate.input';

@ArgsType()
export class IssueAggregateArgs {

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

    @Field(() => IssueCountAggregateInput, {nullable:true})
    _count?: IssueCountAggregateInput;

    @Field(() => IssueAvgAggregateInput, {nullable:true})
    _avg?: IssueAvgAggregateInput;

    @Field(() => IssueSumAggregateInput, {nullable:true})
    _sum?: IssueSumAggregateInput;

    @Field(() => IssueMinAggregateInput, {nullable:true})
    _min?: IssueMinAggregateInput;

    @Field(() => IssueMaxAggregateInput, {nullable:true})
    _max?: IssueMaxAggregateInput;
}
