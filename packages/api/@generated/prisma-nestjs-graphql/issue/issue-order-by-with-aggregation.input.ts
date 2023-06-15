import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { IssueCountOrderByAggregateInput } from './issue-count-order-by-aggregate.input';
import { IssueAvgOrderByAggregateInput } from './issue-avg-order-by-aggregate.input';
import { IssueMaxOrderByAggregateInput } from './issue-max-order-by-aggregate.input';
import { IssueMinOrderByAggregateInput } from './issue-min-order-by-aggregate.input';
import { IssueSumOrderByAggregateInput } from './issue-sum-order-by-aggregate.input';

@InputType()
export class IssueOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    status?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    personId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    personRelationship?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    personCharacter?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    personRecentStatus?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    personRecentIntimacy?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    requestMessage?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    requestDirection?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    requestLimitLength?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    result?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => IssueCountOrderByAggregateInput, {nullable:true})
    _count?: IssueCountOrderByAggregateInput;

    @Field(() => IssueAvgOrderByAggregateInput, {nullable:true})
    _avg?: IssueAvgOrderByAggregateInput;

    @Field(() => IssueMaxOrderByAggregateInput, {nullable:true})
    _max?: IssueMaxOrderByAggregateInput;

    @Field(() => IssueMinOrderByAggregateInput, {nullable:true})
    _min?: IssueMinOrderByAggregateInput;

    @Field(() => IssueSumOrderByAggregateInput, {nullable:true})
    _sum?: IssueSumOrderByAggregateInput;
}
