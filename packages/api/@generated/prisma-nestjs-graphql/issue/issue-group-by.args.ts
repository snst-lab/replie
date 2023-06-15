import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IssueWhereInput } from './issue-where.input';
import { Type } from 'class-transformer';
import { IssueOrderByWithAggregationInput } from './issue-order-by-with-aggregation.input';
import { IssueScalarFieldEnum } from './issue-scalar-field.enum';
import { IssueScalarWhereWithAggregatesInput } from './issue-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { IssueCountAggregateInput } from './issue-count-aggregate.input';
import { IssueAvgAggregateInput } from './issue-avg-aggregate.input';
import { IssueSumAggregateInput } from './issue-sum-aggregate.input';
import { IssueMinAggregateInput } from './issue-min-aggregate.input';
import { IssueMaxAggregateInput } from './issue-max-aggregate.input';

@ArgsType()
export class IssueGroupByArgs {

    @Field(() => IssueWhereInput, {nullable:true})
    @Type(() => IssueWhereInput)
    where?: IssueWhereInput;

    @Field(() => [IssueOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<IssueOrderByWithAggregationInput>;

    @Field(() => [IssueScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof IssueScalarFieldEnum>;

    @Field(() => IssueScalarWhereWithAggregatesInput, {nullable:true})
    having?: IssueScalarWhereWithAggregatesInput;

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
