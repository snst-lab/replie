import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { HideField } from '@nestjs/graphql';
import { QueueMasterCountOrderByAggregateInput } from './queue-master-count-order-by-aggregate.input';
import { QueueMasterAvgOrderByAggregateInput } from './queue-master-avg-order-by-aggregate.input';
import { QueueMasterMaxOrderByAggregateInput } from './queue-master-max-order-by-aggregate.input';
import { QueueMasterMinOrderByAggregateInput } from './queue-master-min-order-by-aggregate.input';
import { QueueMasterSumOrderByAggregateInput } from './queue-master-sum-order-by-aggregate.input';

@InputType()
export class QueueMasterOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    groupId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @HideField()
    password?: keyof typeof SortOrder;

    @HideField()
    cookie?: keyof typeof SortOrder;

    @HideField()
    localStorage?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    proxyUrl?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    proxyUser?: keyof typeof SortOrder;

    @HideField()
    proxyPass?: keyof typeof SortOrder;

    @Field(() => QueueMasterCountOrderByAggregateInput, {nullable:true})
    _count?: QueueMasterCountOrderByAggregateInput;

    @Field(() => QueueMasterAvgOrderByAggregateInput, {nullable:true})
    _avg?: QueueMasterAvgOrderByAggregateInput;

    @Field(() => QueueMasterMaxOrderByAggregateInput, {nullable:true})
    _max?: QueueMasterMaxOrderByAggregateInput;

    @Field(() => QueueMasterMinOrderByAggregateInput, {nullable:true})
    _min?: QueueMasterMinOrderByAggregateInput;

    @Field(() => QueueMasterSumOrderByAggregateInput, {nullable:true})
    _sum?: QueueMasterSumOrderByAggregateInput;
}
