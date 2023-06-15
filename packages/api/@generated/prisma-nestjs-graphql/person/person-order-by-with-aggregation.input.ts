import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { PersonCountOrderByAggregateInput } from './person-count-order-by-aggregate.input';
import { PersonMaxOrderByAggregateInput } from './person-max-order-by-aggregate.input';
import { PersonMinOrderByAggregateInput } from './person-min-order-by-aggregate.input';

@InputType()
export class PersonOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    avatar?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    relationship?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    character?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    recentStatus?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    recentIntimacy?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    deletedAt?: keyof typeof SortOrder;

    @Field(() => PersonCountOrderByAggregateInput, {nullable:true})
    _count?: PersonCountOrderByAggregateInput;

    @Field(() => PersonMaxOrderByAggregateInput, {nullable:true})
    _max?: PersonMaxOrderByAggregateInput;

    @Field(() => PersonMinOrderByAggregateInput, {nullable:true})
    _min?: PersonMinOrderByAggregateInput;
}
