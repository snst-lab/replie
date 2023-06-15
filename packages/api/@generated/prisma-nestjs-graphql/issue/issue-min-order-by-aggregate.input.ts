import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class IssueMinOrderByAggregateInput {

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
}
